import { AddAftersaleDto, EditAftersaleDto } from "@/dto/aftersale.dto";

export function validateAftersaleData(
  dto: AddAftersaleDto,
): { code: string; message: string } | null {
  if (!dto.createdById || dto.createdById <= 0)
    return {
      code: "INVALID_DATA",
      message: "Creator ID is required and must be positive.",
    };
  if (!dto.assignedToId || dto.assignedToId <= 0)
    return {
      code: "INVALID_DATA",
      message: "Assignee ID is required and must be positive.",
    };
  if (!dto.status || dto.status.trim().length === 0)
    return { code: "INVALID_DATA", message: "Status is required." };
  if (!dto.clientDetail || dto.clientDetail.trim().length === 0)
    return { code: "INVALID_DATA", message: "Client detail is required." };
  if (!dto.eccJobReference || dto.eccJobReference.trim().length === 0)
    return { code: "INVALID_DATA", message: "ECC job reference is required." };
  if (!dto.installationAddress || dto.installationAddress.trim().length === 0)
    return {
      code: "INVALID_DATA",
      message: "Installation address is required.",
    };

  for (const compliance of dto.compliances) {
    if (!compliance.serialNumber || compliance.serialNumber.trim().length === 0)
      return {
        code: "INVALID_DATA",
        message: "Serial number in compliance is required.",
      };
  }

  return null;
}

export function validateAftersaleUpdateData(
  dto: EditAftersaleDto,
): { code: string; message: string } | null {
  if (!dto.assignedToId || dto.assignedToId <= 0)
    return {
      code: "INVALID_DATA",
      message: "Assignee ID is required and must be positive.",
    };
  if (!dto.status || dto.status.trim().length === 0)
    return { code: "INVALID_DATA", message: "Status is required." };
  if (!dto.clientDetail || dto.clientDetail.trim().length === 0)
    return { code: "INVALID_DATA", message: "Client detail is required." };
  if (!dto.eccJobReference || dto.eccJobReference.trim().length === 0)
    return { code: "INVALID_DATA", message: "ECC job reference is required." };
  if (!dto.installationAddress || dto.installationAddress.trim().length === 0)
    return {
      code: "INVALID_DATA",
      message: "Installation address is required.",
    };
  return null;
}
