import { CreateComplianceDto, UpdateComplianceDto } from "./compliance.dto";
import { CreateFileDTO, EditFileDTO } from "./files.dto";

export interface CreateAftersaleDto {
  createdById: number;
  assignedToId: number;
  status: string;
  clientDetail: string;
  eccJobReference: string;
  installationAddress?: string;
  softwareProvider?: string;
  payToChargeProvider?: string;
  installationWarranty?: Date | null;
  hardwareWarranty?: Date | null;
  serviceMaintenanceContract?: Date | null;
  signature?: string;
  compliances: CreateComplianceDto[];
  files: CreateFileDTO[];
}

export interface UpdateAftersaleDto {
  id: number;
  createdById: number;
  assignedToId: number;
  status: string;
  clientDetail: string;
  eccJobReference: string;
  installationAddress?: string;
  softwareProvider?: string;
  payToChargeProvider?: string;
  installationWarranty?: Date | null;
  hardwareWarranty?: Date | null;
  serviceMaintenanceContract?: Date | null;
  signature?: string;
  compliances: UpdateComplianceDto[];
  files: CreateFileDTO[];
}

export interface AddAftersaleDto {
  createdById: number;
  assignedToId: number;
  status: string;
  clientDetail: string;
  eccJobReference: string;
  installationAddress?: string;
  softwareProvider?: string;
  payToChargeProvider?: string;
  installationWarranty?: Date | null;
  hardwareWarranty?: Date | null;
  serviceMaintenanceContract?: Date | null;
  compliances: CreateComplianceDto[];
}

export interface EditAftersaleDto {
  id: number;
  createdById: number;
  assignedToId: number;
  status: string;
  clientDetail: string;
  eccJobReference: string;
  installationAddress?: string;
  softwareProvider?: string;
  payToChargeProvider?: string;
  installationWarranty?: Date | null;
  hardwareWarranty?: Date | null;
  serviceMaintenanceContract?: Date | null;
  compliances: UpdateComplianceDto[];
}
