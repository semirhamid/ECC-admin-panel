import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

class EmailService {
  async sendEmail(options: EmailOptions): Promise<void> {
    const { to, from, subject, text, html } = options;
    const message = {
      to,
      from,
      subject,
      text,
      html: html || text,
    };

    try {
      await sgMail.send(message);
      console.log("Email sent successfully");
    } catch (error: any) {
      console.error(
        "Failed to send email",
        error?.response?.body?.errors || error,
      );
      console.error("Failed to send email", error?.response?.body || error);
      throw new Error("Failed to send email");
    }
  }
}

export const emailService = new EmailService();
