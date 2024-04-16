import { PasswordResetService } from "@/services/passwordreset.service";
import { NextRequest, NextResponse } from "next/server";

type ResetData = {
  email: string;
  password: string;
  code: string;
};
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") || "";
  try {
    await PasswordResetService.requestPasswordReset(email);
    return new NextResponse(
      JSON.stringify({ message: "A reset code is sent to your email address" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  const { email, password, code } = (await request.json()) as ResetData;
  try {
    const result = await PasswordResetService.verifyResetCode(email, code);
    if (!result) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid reset code" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    const message = await PasswordResetService.resetPassword(
      email,
      code,
      password,
    );
    return new NextResponse(JSON.stringify({ message: message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
