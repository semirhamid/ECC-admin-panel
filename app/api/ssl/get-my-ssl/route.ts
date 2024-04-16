import { getMySSLByUserId } from "@/services/ssl.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || 0;
  try {
    const aftersale = await getMySSLByUserId(Number(id));
    if (!aftersale) {
      return new NextResponse(
        JSON.stringify({ code: "NOT_FOUND", message: "SSL record not found." }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(aftersale), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error fetching Aftersale record.",
      }),
      { status: 500 },
    );
  }
}
