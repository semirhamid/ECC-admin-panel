export function generateWelcomeEmailHtml(
  userName: string,
  loginUrl: string,
  supportEmail: string,
): string {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #69BE94; color: #ffffff; padding: 20px; text-align: center; border-bottom: 4px solid #E6F4ED;">
                <h1>Welcome to the ECC Management Team!</h1>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
                <p style="font-size: 16px;">We're excited to have you on board. To get started, you can log in to your new account where you'll find all the tools you need to begin. Here's your first step:</p>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="${loginUrl}" style="display: inline-block; padding: 10px 20px; background-color: #69BE94; color: #ffffff; border-radius: 5px; text-decoration: none; font-size: 16px;">Log in to your account</a>
                </p>
                <p style="font-size: 16px;">If you have any questions or need assistance, our support team is here for you:</p>
                <p style="font-size: 16px; text-align: center;"><a href="mailto:${supportEmail}" style="color: #69BE94;">${supportEmail}</a></p>
                <p style="color: #69BE94; text-align: center;">We're thrilled to see what you will achieve with ECC Management Team!</p>
            </div>
            <div style="background-color: #f0f0f0; color: #333; padding: 20px; text-align: center; border-top: 4px solid #ddd;">
                <p style="font-size: 14px;">Welcome aboard!</p>
            </div>
        </div>
    </div>
    `;
}
