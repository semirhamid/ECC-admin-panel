export interface CreateFileDTO {
  filename: string;
  url: string;
  sslFormId?: number;
  aftersaleId?: number;
}

export interface EditFileDTO {
  id?: number;
  filename: string;
  url: string;
  sslFormId?: number;
  aftersaleId?: number;
}