import { CreateSSLFormDto, SSLFormUpdateDto } from "@/dto/ssl.dto";

export function validateCreateSSLFormDto(
  dto: CreateSSLFormDto,
): { code: string; message: string } | null {
  const requiredFields = [
    "createdById",
    "assignedToId",
    "status",
    "address1",
    "city",
    "country",
    "postCode",
    "noAcPoints",
    "noDcPoints",
    "makeOfChargePoint",
    "ampsPerCp",
    "kwPerCp",
    "wallMountSingle",
    "wallMountDual",
    "floorMountSingle",
    "floorMountDual",
    "phaseType",
    "mainsFuseSize",
    "mainsIsolation",
    "earthingSetup",
    "mobileSignal",
    "signalStrength",
    "consumerUnitMake",
    "consumerUnitModel",
    "totalSpareWays",
    "totalAmpsInUse",
    "cableSizeRead",
    "cableLengthTotal",
    "totalCableRuns",
    "internalCableAttachment",
    "dataCableRun",
    "cableRunDescription",
    "selectOptions",
    "gwLength",
    "gwWidth",
    "gwDepth",
    "ductingSize",
    "ductingLength",
    "groundWorksDescription",
  ];

  for (const field of requiredFields) {
    console.log("Field", dto[field], "value", String(dto[field]).trim())
    if (!dto[field] || String(dto[field]).trim().length === 0) {
      return { code: "INVALID_DATA", message: `${field} is required.` };
    }
  }
  if (dto.createdById < 0 || dto.assignedToId < 0) {
    return { code: "INVALID_DATA", message: "ID fields must be positive." };
  }

  return null;
}

export function validateSSLFormUpdateDto(
  dto: SSLFormUpdateDto,
): { code: string; message: string } | null {
  if (typeof dto.id !== "number" || dto.id <= 0) {
    return {
      code: "INVALID_DATA",
      message: "ID is required and must be positive.",
    };
  }

  if (dto.status !== undefined && dto.status.trim().length === 0) {
    return {
      code: "INVALID_DATA",
      message: "Status, if provided, cannot be empty.",
    };
  }

  return null;
}
