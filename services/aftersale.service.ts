import { CreateAftersaleDto, UpdateAftersaleDto } from "@/dto/aftersale.dto";
import { UpdateComplianceDto } from "@/dto/compliance.dto";
import prisma from "./prismaClient.service";

export async function createAftersale(dto: CreateAftersaleDto) {
  const { compliances, files, ...aftersaleData } = dto;

  try {
    const aftersale = await prisma.aftersale.create({
      data: {
        ...aftersaleData,
        compliances: {
          create: compliances,
        },
        files: {
          create: files
        }
      },
      include: {
        compliances: true,
        files: true,
      },
    });
    return aftersale;
  } catch (error) {
    console.error("Failed to create Aftersale record:", error);
    throw new Error("Failed to create Aftersale record");
  }
}

export async function updateAftersale(id: number, dto: UpdateAftersaleDto) {
  const { compliances, files, ...aftersaleData } = dto;

  try {
    const complianceUpdates = compliances.map(
      (compliance: UpdateComplianceDto) => ({
        where: { id: compliance.id },
        data: compliance,
      }),
    );

    const aftersale = await prisma.aftersale.update({
      where: { id },
      data: {
        ...aftersaleData,
        compliances: {
          updateMany: complianceUpdates,
        },
        files: {
          create: files
        }
      },
      include: {
        compliances: true,
        files: true,
      },
    });
    return aftersale;
  } catch (error) {
    console.error(`Failed to update Aftersale record with ID ${id}:`, error);
    throw new Error(`Failed to update Aftersale record with ID ${id}`);
  }
}

export async function getAllAftersales() {
  try {
    return await prisma.aftersale.findMany({
      include: {
        compliances: true,
        files: true
      },
    });
  } catch (error) {
    console.error("Failed to get all Aftersales records:", error);
    throw new Error("Failed to get all Aftersales records");
  }
}

export async function getAftersaleById(id: number) {
  try {
    return await prisma.aftersale.findUnique({
      where: { id },
      include: {
        compliances: true,
        files: true
      },
    });
  } catch (error) {
    console.error(`Failed to get Aftersale record with ID ${id}:`, error);
    throw new Error(`Failed to get Aftersale record with ID ${id}`);
  }
}

export async function deleteAftersale(id: number) {
  try {
    await prisma.file.deleteMany({
      where: { aftersaleId: id },
    });
    return await prisma.$transaction(async (prisma) => {
      await prisma.compliance.deleteMany({
        where: { aftersaleId: id },
      });
      return await prisma.aftersale.delete({
        where: { id },
      });
    });
  } catch (error) {
    console.error(`Failed to delete Aftersale record with ID ${id}:`, error);
    throw new Error(`Failed to delete Aftersale record with ID ${id}`);
  }
}

export async function getAftersalesByUserId(userId: number) {
  try {
    const aftersales = await prisma.aftersale.findMany({
      where: {
        assignedToId: userId,
      },
      include: {
        compliances: true,
        files: true
      },
    });
    return aftersales;
  } catch (error) {
    console.error(
      `Failed to get Aftersales records for user ID ${userId}:`,
      error,
    );
    throw new Error(`Failed to get Aftersales records for user ID ${userId}`);
  }
}
