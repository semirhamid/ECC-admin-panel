import { CreateFileDTO, EditFileDTO } from "@/dto/files.dto";
import { File } from "@prisma/client";
import prisma from "./prismaClient.service";

export async function createFile(data: CreateFileDTO): Promise<File> {
  return prisma.file.create({
    data,
  });
}

export async function createMultipleFiles(data: CreateFileDTO[]) {
  return prisma.file.createMany({
    data,
  });
}


export async function getFileById(id: number): Promise<File | null> {
  return prisma.file.findUnique({
    where: { id },
  });
}

export async function updateFile(
  id: number,
  data: EditFileDTO,
): Promise<File> {
  return prisma.file.update({
    where: { id },
    data,
  });
}

export async function deleteFile(id: number): Promise<File> {
  return prisma.file.delete({
    where: { id },
  });
}


export async function deleteBySSLIdile(id: number) {
  return prisma.file.deleteMany({
    where: { sslFormId: id },
  });
}

export async function deleteByAftersaleIdile(id: number) {
  return prisma.file.deleteMany({
    where: { aftersaleId: id },
  });
}

export async function getMyFilesBySSlId(sslId: number): Promise<File[]> {
  return prisma.file.findMany({
    where: {
      sslFormId: sslId,
    },
  });
}
export async function getMyFilesByAfterSaleId(aftersaleId: number): Promise<File[]> {
  return prisma.file.findMany({
    where: {
      aftersaleId: aftersaleId,
    },
  });
}
