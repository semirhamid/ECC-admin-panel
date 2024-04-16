// Assuming the correct imports are in place
import { registerDeviceToken } from "@/services/notification.service";
import { NextRequest, NextResponse } from "next/server";

type RegisterDeviceDto = {
  userId: number;
  deviceToken: string;
};

export async function POST(request: NextRequest) {
  const { userId, deviceToken } = (await request.json()) as RegisterDeviceDto;

  try {
    const registrationSuccess = await registerDeviceToken(userId, deviceToken);

    if (!registrationSuccess) {
      return new NextResponse(
        JSON.stringify({ message: "Device token registration failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Device token registered successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error registering device token" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
