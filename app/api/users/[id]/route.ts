import { getUserById } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split("/").pop();
    const result = await getUserById(Number(userId));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({
      message: "Failed",
      error: "Error Occuerred",
      status: 500,
    });
  }
}
