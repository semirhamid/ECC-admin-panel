// DTO for creating a Compliance record
export interface CreateComplianceDto {
  serialNumber: string;
  compliant: boolean;
  installationDate: Date;
  manufacturerName: string;
  chargePointLocation: string;
  makeAndModel: string;
  softwareVersion: string;
}

// DTO for updating a Compliance record
export interface UpdateComplianceDto {
  id: number;
  serialNumber: string;
  compliant: boolean;
  installationDate: Date;
  manufacturerName: string;
  chargePointLocation: string;
  makeAndModel: string;
  softwareVersion: string;
}
