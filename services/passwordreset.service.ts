import prisma from "./prismaClient.service";
import { emailService } from "@/services/email.service";
import { generateNumericCode } from "./generator.service";
import bcrypt from "bcrypt";

export class PasswordResetService {
  static async requestPasswordReset(email: string) {
    const FROM_EMAIL_ADDRESS: string = process.env.EMAIL_FROM_ADDRESS as string;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const code = generateNumericCode(4);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
      },
    });

    await emailService.sendEmail({
      to: email,
      from: FROM_EMAIL_ADDRESS,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
      html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .email-container { max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        .header { background-color: #69BE94; color: white; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
        .content { padding: 20px; text-align: center; line-height: 1.6; }
        .code { background-color: #e8f5e9; color: #333; padding: 10px; border-radius: 4px; font-size: 24px; letter-spacing: 3px; margin: 20px 0; display: inline-block; }
        .footer { margin-top: 20px; text-align: center; color: #aaa; font-size: 14px; }
        .button { display: inline-block; background-color: #69BE94; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-size: 18px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Password Reset Request</div>
        <div class="content">
            <p>Hi ${user.name},</p>
            <p>You recently requested to reset your password for your account. Use the code below to reset it.</p>
            <div class="code">${code}</div>
            <p>This code is valid for 1 hour only.</p>
            <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
        </div>
        <div class="footer">
            &copy; ECC | <a href="https://ecc-admin-dashboard.vercel.app">Visit our Website</a>
        </div>
    </div>
</body>
</html>
  `,
    });
  }

  static async verifyResetCode(email: string, code: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { passwordResetTokens: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const validToken = user.passwordResetTokens.find(
      (token) => token.code === code && new Date(token.expiresAt) > new Date(),
    );

    if (!validToken) {
      return false;
    }

    return true;
  }

  static async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { passwordResetTokens: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const validToken = user.passwordResetTokens.find(
      (token) => token.code === code && new Date(token.expiresAt) > new Date(),
    );

    if (!validToken) {
      throw new Error("Invalid or expired reset code");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: validToken.id },
    });

    return "Password has been reset successfully";
  }

  static async changePassword(email: string, oldPassword: string, newPassword: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return "Password has been changed successfully";
  }
}
