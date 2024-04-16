import { NextRequest, NextResponse } from "next/server";
import { verifyToken, generateToken } from "@/services/auth.service";

function getTokenFromRequest(request: NextRequest): string | null {
  const authorizationHeader = request.headers.get("Authorization");
  if (!authorizationHeader) return null;

  const parts = authorizationHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }

  return null;
}

export async function GET(request: NextRequest, response: NextResponse) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "No token provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const userId = await verifyToken(token);
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newToken = generateToken(userId);
    return new NextResponse(JSON.stringify({ newToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error refreshing token" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
