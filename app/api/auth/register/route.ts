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
function validateUserData({
  fullName,
  password,
  phoneNumber,
  email,
}: UserData): string | null {
  if (!fullName) return "Full name must not be empty.";

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password))
    return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";

  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phoneNumber))
    return "Phone number must be in international format.";

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) return "Invalid email format.";

  return null;
}

export async function POST(request: NextRequest) {
  const { fullName, password, phoneNumber, email } =
    (await request.json()) as UserData;

  const validationError = validateUserData({
    fullName,
    password,
    phoneNumber,
    email,
  });
  if (validationError) {
    return new NextResponse(JSON.stringify({ message: validationError }), {
      status: 400,
    });
  }

  try {
    const user = await createUser(email, password, phoneNumber, fullName);
    const token = generateToken(user.id);
    const emailOptions = {
      to: user.email,
      from: FROM_EMAIL_ADDRESS,
      subject: `Welcome To ECC`,
      text: `Ecc Dashboard Management`,
      html: generateWelcomeEmailHtml(
        user.name,
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
