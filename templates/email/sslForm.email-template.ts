export function generateEmailHtml(
  assigneeName: string,
  formStatus: string,
  formId: number,
  createdBy: string,
): string {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #69BE94; color: #ffffff; padding: 20px; text-align: center; border-bottom: 4px solid #E6F4ED;">
                <h1>New Task Assigned</h1>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 16px;">Hello <strong>${assigneeName}</strong>,</p>
                <p style="font-size: 16px;">You have been assigned a new task with the following details:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px;"><strong>Task Status:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px;">${formStatus}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px;"><strong>Task ID:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px;">${formId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px;"><strong>Assigned by:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px;">${createdBy}</td>
                    </tr>
                </table>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="https://ecc-admin-dashboard.vercel.app" style="display: inline-block; padding: 10px 20px; background-color: #69BE94; color: #ffffff; border-radius: 5px; text-decoration: none; font-size: 16px;">View Task</a>
                </p>
            </div>
            <div style="background-color: #f0f0f0; color: #333; padding: 20px; text-align: center; border-top: 4px solid #ddd;">
                <p style="font-size: 14px;">Need help? Contact our support team.</p>
            </div>
        </div>
    </div>
    `;
}
