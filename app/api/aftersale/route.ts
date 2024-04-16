import {
  AddAftersaleDto,
  CreateAftersaleDto,
  EditAftersaleDto,
  UpdateAftersaleDto,
} from "@/dto/aftersale.dto";
import {
  createAftersale,
  deleteAftersale,
  getAftersaleById,
  updateAftersale,
} from "@/services/aftersale.service";
import { NextRequest, NextResponse } from "next/server";
import {
  validateAftersaleData,
  validateAftersaleUpdateData,
} from "./aftersale.validation";
import { put } from "@vercel/blob";
import { getUserById } from "@/services/user.service";
import { generateEmailHtml } from "@/templates/email/sslForm.email-template";
import { emailService } from "@/services/email.service";
import NotificationService, {
  NotificationMessage,
} from "@/services/notification.service";

const FROM_EMAIL_ADDRESS: string = process.env.EMAIL_FROM_ADDRESS as string;
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // Extract signature and attachments from form data
    const signature = formData.get("signature") as File;
    const attachments = Array.from(formData.getAll("files")).map(item => item as File);

    // Process aftersale data from form data
    const aftersaleDto: CreateAftersaleDto = {
      createdById: Number(formData.get("createdById")),
      assignedToId: Number(formData.get("assignedToId")),
      status: (formData.get("status") || "").toString(),
      clientDetail: (formData.get("clientDetail") || "").toString(),
      eccJobReference: (formData.get("eccJobReference") || "").toString(),
      installationAddress: (formData.get("installationAddress") || "").toString(),
      softwareProvider: (formData.get("softwareProvider") || "").toString(),
      payToChargeProvider: (formData.get("payToChargeProvider") || "").toString(),
      installationWarranty: new Date(
        (formData.get("installationWarranty") || "").toString(),
      ),
      hardwareWarranty: new Date(
        (formData.get("hardwareWarranty") || "").toString(),
      ),
      serviceMaintenanceContract: new Date(
        (formData.get("serviceMaintenanceContract") || "").toString(),
      ),
      compliances: JSON.parse(
        (formData.get("compliances") || "[]").toString(),
      ).map((compliance: any) => ({
        serialNumber: compliance.serialNumber,
        compliant: compliance.compliant,
        installationDate: new Date(compliance.installationDate),
        manufacturerName: compliance.manufacturerName,
        chargePointLocation: compliance.chargePointLocation,
        makeAndModel: compliance.makeAndModel,
        softwareVersion: compliance.softwareVersion,
      })),
      files: [],
    };
    console.log(formData)

    // Upload signature and attachments
    const signatureUrl = signature ? await uploadFile(signature) : null;
    const attachmentUrls = await Promise.all(attachments.map(uploadFile));

    // Populate files array in aftersaleDto
    const files = [];
    if (signatureUrl) {
      aftersaleDto.signature = signatureUrl;
    }
    files.push(...attachmentUrls.map((url, index) => ({ filename: attachments[index].name, url })));
    aftersaleDto.files = files.map(file => ({ filename: file.filename, url: file.url }));

    // Validate aftersaleDto
    const validationError = validateAftersaleData(aftersaleDto);
    if (validationError) {
      return new NextResponse(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create aftersale record
    const createdAftersale = await createAftersale(aftersaleDto);

    // Send email notification and push notification
    const assigneeUser = await getUserById(aftersaleDto.assignedToId);
    const createdByUser = await getUserById(aftersaleDto.createdById);
    const emailOptions = {
      to: assigneeUser.email,
      from: FROM_EMAIL_ADDRESS,
      subject: `New Task Assigned to You`,
      text: `You have been assigned a new task. Task Status: ${createdAftersale.status} Task ID: ${createdAftersale.id} Assigned by: ${createdByUser.name}`,
      html: generateEmailHtml(
        assigneeUser.name,
        createdAftersale.status,
        createdAftersale.id,
        createdByUser.name,
      ),
    };
    await emailService.sendEmail(emailOptions);

    const notificationData: NotificationMessage = {
      title: "A new Aftersale has been assigned to you",
      body: `Task Status: ${createdAftersale.status} Task ID: ${createdAftersale.id} Assigned by: ${createdByUser.name}`,
      data: {
        type: "afterSale",
        id: createdAftersale.id,
      },
    };
    // await NotificationService.sendToUser(assigneeUser.id, notificationData);

    // Return response with created aftersale data
    return new NextResponse(JSON.stringify(createdAftersale), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: error?.toString(),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// Helper function to upload a file
async function uploadFile(file: File): Promise<string> {
  const fileUrl = await put(file.name, file, { access: "public" });
  return fileUrl.url;
}


export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || 0;
  try {
    const aftersale = await getAftersaleById(Number(id));
    if (!aftersale) {
      return new NextResponse(
        JSON.stringify({
          code: "NOT_FOUND",
          message: "Aftersale record not found.",
        }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(aftersale), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error fetching Aftersale record.",
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
    const aftersale = await deleteAftersale(parseInt(id));
    if (!aftersale) {
      return new NextResponse(
        JSON.stringify({
          code: "NOT_FOUND",
          message: "Aftersale record not found.",
        }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(aftersale), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error fetching Aftersale record.",
      }),
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract signature file from form data
    const signature = formData.get("signature") as File;
    const attachments = Array.from(formData.getAll("files")).map(item => item as File);
    const attachmentUrls = await Promise.all(attachments.map(uploadFile));

    // Process update data from form data
    const updateData: EditAftersaleDto = {
      id: Number(formData.get("id")),
      createdById: Number(formData.get("createdById")),
      assignedToId: Number(formData.get("assignedToId")),
      status: (formData.get("status") || "").toString(),
      clientDetail: (formData.get("clientDetail") || "").toString(),
      eccJobReference: (formData.get("eccJobReference") || "").toString(),
      installationAddress: (formData.get("installationAddress") || "").toString(),
      softwareProvider: (formData.get("softwareProvider") || "").toString(),
      payToChargeProvider: (formData.get("softwareProvider") || "").toString(),
      installationWarranty: new Date(
        (formData.get("installationWarranty") || "").toString(),
      ),
      hardwareWarranty: new Date(
        (formData.get("hardwareWarranty") || "").toString(),
      ),
      serviceMaintenanceContract: new Date(
        (formData.get("serviceMaintenanceContract") || "").toString(),
      ),
      compliances: JSON.parse(
        (formData.get("compliances") || "[]").toString(),
      ).map((compliance: any) => ({
        serialNumber: compliance.serialNumber,
        compliant: compliance.compliant,
        installationDate: new Date(compliance.installationDate),
        manufacturerName: compliance.manufacturerName,
        chargePointLocation: compliance.chargePointLocation,
        makeAndModel: compliance.makeAndModel,
        softwareVersion: compliance.softwareVersion,
      })),
    };

    if (!updateData.id) {
      return new NextResponse(
        JSON.stringify({ error: "Aftersale ID is required for update" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const validationError = validateAftersaleUpdateData(updateData);
    if (validationError) {
      return new NextResponse(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let signatureUrl = "";
    if (signature) {
      // Upload signature file
      signatureUrl = await uploadFile(signature);
    }

    // Prepare update data with signature URL
    const aftersaleData: UpdateAftersaleDto = {
      ...updateData,
      files: attachmentUrls.map((url, index) => ({
        filename: attachments[index].name,
        url,
      })),
    };
    if (signatureUrl) {
      aftersaleData.signature = signatureUrl;
    }

    // Update aftersale record
    const updatedAftersale = await updateAftersale(updateData.id, aftersaleData);

    // Return response with updated aftersale data
    return new NextResponse(JSON.stringify(updatedAftersale), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error updating Aftersale record",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}