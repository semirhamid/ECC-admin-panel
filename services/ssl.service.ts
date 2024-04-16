import { CreateSSLFormDto, SSLFormUpdateDto } from "@/dto/ssl.dto";
import { SSLForm } from "@prisma/client";
import prisma from "./prismaClient.service";

export async function createSSLForm(data: CreateSSLFormDto): Promise<SSLForm> {
  const { files, ...ssl } = data;

  return prisma.sSLForm.create({
    data: {
      ...ssl,
      files: {
        create: files
      }
    }, include: {
      files: true
    }

  })
}

export async function getAllSSLForms(): Promise<SSLForm[]> {
  return prisma.sSLForm.findMany()
}

export async function getSSLFormById(id: number): Promise<SSLForm | null> {
  return prisma.sSLForm.findUnique({
    where: { id },
  })
}

export async function updateSSLForm(
  _id: number,
  data: SSLFormUpdateDto,
): Promise<SSLForm> {
  const { files, id, ...ssl } = data;


  return prisma.sSLForm.update({
    where: { id },
    data: {
      ...ssl,
      files: {
        create: files
      }
    }, include: {
      files: true
    }

  })
}

export async function deleteSSLForm(id: number): Promise<SSLForm> {
  return await prisma.$transaction(async (prisma) => {
    await prisma.file.deleteMany({
      where: { sslFormId: id },
    });

    return await prisma.sSLForm.delete({
      where: { id },
    });
  })
}

export async function getMySSLByUserId(userId: number): Promise<SSLForm[]> {
  return prisma.sSLForm.findMany({
    where: {
      assignedToId: userId,
    },
  })
}
