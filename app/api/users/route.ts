import { getAllUsers } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await getAllUsers();
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
