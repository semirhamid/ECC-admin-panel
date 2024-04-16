import { PasswordResetService } from "@/services/passwordreset.service";
import { NextRequest, NextResponse } from "next/server";
type ChangePasswordData = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export async function POST(request: NextRequest) {
  const { email, oldPassword, newPassword } = (await request.json()) as ChangePasswordData;
  try {
    const message = await PasswordResetService.changePassword(
      email,
      oldPassword,
      newPassword,
    );
    return new NextResponse(JSON.stringify({ message: message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const status = error instanceof Error && error.message === "User not found" ? 404 :
      error instanceof Error && error.message === "Old password is incorrect" ? 401 : 500;
    return new NextResponse(JSON.stringify({ message: error || "Error occurred" }), {
      status: status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
