import { NextRequest, NextResponse } from "next/server";
import { createUser, generateToken } from "@/services/auth.service";
import { generateWelcomeEmailHtml } from "@/templates/email/register.email-template";
import { emailService } from "@/services/email.service";

type UserData = {
  fullName: string;
  password: string;
  phoneNumber: string;
  email: string;
};
const FROM_EMAIL_ADDRESS: string = process.env.EMAIL_FROM_ADDRESS as string;


export async function POST(request: NextRequest) {
  const { fullName, password, phoneNumber, email } =
    (await request.json()) as UserData;

  try {
    const token = "asdnjaskddnkjfas"
    const emailOptions = {
      to: email,
      from: FROM_EMAIL_ADDRESS,
      subject: `Welcome To ECC`,
      text: `Ecc Dashboard Management`,
      html: generateWelcomeEmailHtml(
        "Semir",
        "https://ecc-admin-dashboard.vercel.app",
        FROM_EMAIL_ADDRESS
      ),
    };

    await emailService.sendEmail(emailOptions);
    return new NextResponse(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error registering new user" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
