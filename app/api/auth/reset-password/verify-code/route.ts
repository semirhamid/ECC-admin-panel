import { PasswordResetService } from "@/services/passwordreset.service";
import { NextRequest, NextResponse } from "next/server";

type ResetData = {
  email: string;
  code: string;
};

export async function POST(request: NextRequest) {
  const { email, code } = (await request.json()) as ResetData;
  try {
    const result = await PasswordResetService.verifyResetCode(email, code);
    if (!result) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid reset code" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "The reset code is true" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
