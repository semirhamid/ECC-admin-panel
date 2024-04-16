import { NextRequest, NextResponse } from "next/server";
import {
  validateCreateSSLFormDto,
  validateSSLFormUpdateDto,
} from "./ssl.validation";
import {
  createSSLForm,
  deleteSSLForm,
  getSSLFormById,
  updateSSLForm,
} from "@/services/ssl.service";
import { CreateSSLFormDto, SSLFormUpdateDto } from "@/dto/ssl.dto";
import { getUserById } from "@/services/user.service";
import { generateEmailHtml } from "@/templates/email/sslForm.email-template";
import { emailService } from "@/services/email.service";
import NotificationService, {
  NotificationMessage,
} from "@/services/notification.service";
import { put } from "@vercel/blob";

async function uploadFile(file: File): Promise<string> {
  const fileUrl = await put(file.name, file, { access: "public" });
  return fileUrl.url;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const attachments = Array.from(formData.getAll("files")).map(item => item as File);
    const FROM_EMAIL_ADDRESS: string = process.env.EMAIL_FROM_ADDRESS as string;
    const sslDto: CreateSSLFormDto = {
      address1: formData.get("address1") as string,
      address2: formData.get("address2") as string,
      address3: formData.get("address3") as string,
      address4: formData.get("address4") as string,
      city: formData.get("city") as string,
      ampsPerCp: formData.get("ampsPerCp") as string,
      assignedToId: parseInt(formData.get("assignedToId") as string),
      cableLengthTotal: formData.get("cableLengthTotal") as string,
      cableRunDescription: formData.get("cableRunDescription") as string,
      cableSizeRead: formData.get("cableSizeRead") as string,
      consumerUnitMake: formData.get("consumerUnitMake") as string,
      consumerUnitModel: formData.get("consumerUnitModel") as string,
      country: formData.get("country") as string,
      createdById: parseInt(formData.get("createdById") as string),
      dataCableRun: formData.get("dataCableRun") as string,
      ductingLength: formData.get("ductingLength") as string,
      ductingSize: formData.get("ductingSize") as string,
      earthingSetup: formData.get("earthingSetup") as string,
      files: [],
      floorMountDual: parseInt(formData.get("floorMountDual") as string),
      floorMountSingle: parseInt(formData.get("floorMountSingle") as string),
      groundWorksDescription: formData.get("groundWorksDescription") as string,
      gwDepth: formData.get("gwDepth") as string,
      gwWidth: formData.get("gwWidth") as string,
      gwLength: formData.get("gwLength") as string,
      installationEarthingSetup: formData.get("installationEarthingSetup") as string,
      internalCableAttachment: formData.get("internalCableAttachment") as string,
      kwPerCp: formData.get("kwPerCp") as string,
      mainsFuseSize: formData.get("mainsFuseSize") as string,
      mainsIsolation: formData.get("mainsIsolation") as string,
      makeOfChargePoint: formData.get("makeOfChargePoint") as string,
      mobileSignal: formData.get("mobileSignal") as string,
      noAcPoints: parseInt(formData.get("noAcPoints") as string),
      noDcPoints: parseInt(formData.get("noDcPoints") as string),
      phaseType: formData.get("phaseType") as string,
      postCode: formData.get("postCode") as string,
      selectOptions: formData.get("selectOptions") as string,
      signalStrength: formData.get("signalStrength") as string,
      status: formData.get("status") as string,
      totalAmpsInUse: formData.get("totalAmpsInUse") as string,
      totalCableRuns: formData.get("totalCableRuns") as string,
      totalSpareWays: formData.get("totalSpareWays") as string,
      wallMountDual: parseInt(formData.get("wallMountDual") as string),
      wallMountSingle: parseInt(formData.get("wallMountSingle") as string),

    }
    const attachmentUrls = await Promise.all(attachments.map(uploadFile));
    sslDto.files.push(...attachmentUrls.map((url, index) => ({ filename: attachments[index].name, url })));

    const validationError = validateCreateSSLFormDto(sslDto);
    if (validationError) {
      return new NextResponse(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const assigneeUser = await getUserById(sslDto.assignedToId);
    const createdByUser = await getUserById(sslDto.createdById);

    const createdForm = await createSSLForm(sslDto);
    const emailOptions = {
      to: assigneeUser.email,
      from: FROM_EMAIL_ADDRESS,
      subject: `New Task Assigned you`,
      text: `You have been assigned a new task. Task Status: ${createdForm.status} Task ID: ${createdForm.id} Assigned by: ${createdByUser.name}`,
      html: generateEmailHtml(
        assigneeUser.name,
        createdForm.status,
        createdForm.id,
        createdByUser.name,
      ),
    };

    await emailService.sendEmail(emailOptions);
    const notificationData: NotificationMessage = {
      title: "A new SSL has been assigned to you",
      body: `Task Status: ${createdForm.status} Task ID: ${createdForm.id} Assigned by: ${createdByUser.name}`,
      data: {
        type: "ssl",
        id: createdForm.id,
      },
    };
    await NotificationService.sendToUser(assigneeUser.id, notificationData);
    return new NextResponse(JSON.stringify(createdForm), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error creating SSL record",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || 0;
  try {
    const ssl = await getSSLFormById(Number(id));
    if (!ssl) {
      return new NextResponse(
        JSON.stringify({ code: "NOT_FOUND", message: "SSL record not found." }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(ssl), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error fetching ssl record.",
      }),
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new NextResponse(
        JSON.stringify({ code: "NOT_FOUND", message: "Id is required." }),
        { status: 404 },
      );
    }
    const ssl = await deleteSSLForm(parseInt(id));
    if (!ssl) {
      return new NextResponse(
        JSON.stringify({ code: "NOT_FOUND", message: "SSL record not found." }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(ssl), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error fetching ssl record.",
      }),
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const attachments = Array.from(formData.getAll("files")).map(item => item as File);
    const FROM_EMAIL_ADDRESS: string = process.env.EMAIL_FROM_ADDRESS as string;
    const updateData: SSLFormUpdateDto = {
      id: parseInt(formData.get("id") as string),
      address1: formData.get("address1") as string,
      address2: formData.get("address2") as string,
      address3: formData.get("address3") as string,
      address4: formData.get("address4") as string,
      city: formData.get("city") as string,
      ampsPerCp: formData.get("ampsPerCp") as string,
      assignedToId: parseInt(formData.get("assignedToId") as string),
      cableLengthTotal: formData.get("cableLengthTotal") as string,
      cableRunDescription: formData.get("cableRunDescription") as string,
      cableSizeRead: formData.get("cableSizeRead") as string,
      consumerUnitMake: formData.get("consumerUnitMake") as string,
      consumerUnitModel: formData.get("consumerUnitModel") as string,
      country: formData.get("country") as string,
      createdById: parseInt(formData.get("createdById") as string),
      dataCableRun: formData.get("dataCableRun") as string,
      ductingLength: formData.get("ductingLength") as string,
      ductingSize: formData.get("ductingSize") as string,
      earthingSetup: formData.get("earthingSetup") as string,
      files: [],
      floorMountDual: parseInt(formData.get("floorMountDual") as string),
      floorMountSingle: parseInt(formData.get("floorMountSingle") as string),
      groundWorksDescription: formData.get("groundWorksDescription") as string,
      gwDepth: formData.get("gwDepth") as string,
      gwWidth: formData.get("gwWidth") as string,
      gwLength: formData.get("gwLength") as string,
      installationEarthingSetup: formData.get("installationEarthingSetup") as string,
      internalCableAttachment: formData.get("internalCableAttachment") as string,
      kwPerCp: formData.get("kwPerCp") as string,
      mainsFuseSize: formData.get("mainsFuseSize") as string,
      mainsIsolation: formData.get("mainsIsolation") as string,
      makeOfChargePoint: formData.get("makeOfChargePoint") as string,
      mobileSignal: formData.get("mobileSignal") as string,
      noAcPoints: parseInt(formData.get("noAcPoints") as string),
      noDcPoints: parseInt(formData.get("noDcPoints") as string),
      phaseType: formData.get("phaseType") as string,
      postCode: formData.get("postCode") as string,
      selectOptions: formData.get("selectOptions") as string,
      signalStrength: formData.get("signalStrength") as string,
      status: formData.get("status") as string,
      totalAmpsInUse: formData.get("totalAmpsInUse") as string,
      totalCableRuns: formData.get("totalCableRuns") as string,
      totalSpareWays: formData.get("totalSpareWays") as string,
      wallMountDual: parseInt(formData.get("wallMountDual") as string),
      wallMountSingle: parseInt(formData.get("wallMountSingle") as string),
    }
    const validationError = validateSSLFormUpdateDto(updateData);
    if (validationError) {
      return new NextResponse(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const attachmentUrls = await Promise.all(attachments.map(uploadFile));
    updateData.files.push(...attachmentUrls.map((url, index) => ({ filename: attachments[index].name, url })));


    if (!updateData.id) {
      return new NextResponse(
        JSON.stringify({ error: "ID is required for update" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const updatedRecord = await updateSSLForm(updateData.id, updateData);

    return new NextResponse(JSON.stringify(updatedRecord), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error updating record",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
