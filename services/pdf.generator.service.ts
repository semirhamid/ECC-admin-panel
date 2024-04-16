// import { File } from 'html-pdf-node';
// import { put } from '@vercel/blob';
// import fetch from 'node-fetch';

// interface CreateAftersaleDto {
//   id: number;
//   createdById: number;
//   assignedToId: number;
//   status: string;
//   clientDetail: string;
//   manufacturerName: string;
//   eccJobReference: string;
//   makeAndModel: string;
//   installationAddress: string;
//   softwareVersion: string;
//   signature?: string;
//   compliances: CreateComplianceDto[]
// }
// export interface CreateComplianceDto {
//   serialNumber: string;
//   compliant: boolean;
//   hardwareWarranty: Date;
//   serviceMaintenanceContract: Date;
//   installationWarranty: Date;
//   passcode: string;
//   chargePointLocation: string;
//   aftersaleId: number;
// }

// async function fetchImageAsBase64(url: string): Promise<string> {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   return buffer.toString('base64');
// }

// export async function generatePdfFromData(data: CreateAftersaleDto) {
//   let signatureBase64 = '';
//   if (data.signature) {
//     signatureBase64 = await fetchImageAsBase64(data.signature);
//   }
//   let tableRows = data.compliances.map(compliance => `
//     <tr>
//       <td>${compliance.serialNumber}</td>
//       <td>${compliance.compliant ? 'Yes' : 'No'}</td>
//       <td>${compliance.passcode}</td>
//       <td>${compliance.chargePointLocation}</td>
//     </tr>
//   `).join('');

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { padding-inline: 20px; }
//         table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; }
//         td, th { border: 1px solid #000; text-align: left; padding: 4px; }
//         .page-break { page-break-after: always; }
//       </style>
//     </head>
//     <body>
//       <img src="data:image/jpeg;base64,${signatureBase64}" style="width: 200px; display: flex; margin-inline: auto; background-color: red" />
//       <p style="text-align: center; font-weight: 600; margin-block: 20px">EV CHARGEPOINT HANDOVER FORM</p>
//       <!-- Your static content here -->
//       <table>${tableRows}</table>
//       <!-- More static content as needed -->
//     </body>
//     </html>
//   `;

//   const options = { format: 'A4' };
//   const pdfBuffer = new File(htmlContent, options);
//   const filename = `Aftersale-${data.eccJobReference}.pdf`;

//   try {
//     const result = await put(filename, pdfBuffer, { access: "public" });
//     console.log("PDF uploaded: ", result.url);
//     return result.url;
//   } catch (error) {
//     console.error("Error uploading PDF to Vercel: ", error);
//     throw error;
//   }

// }
