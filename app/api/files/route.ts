import { deleteFile } from "@/services/files.service";
import { NextRequest, NextResponse } from "next/server";




export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new NextResponse(
        JSON.stringify({ code: "NOT_FOUND", message: "Id is required." }),
        { status: 404 },
      );
    }
    const file = await deleteFile(parseInt(id));
    if (!file) {
      return new NextResponse(
        JSON.stringify({ code: "NOT_FOUND", message: "file record not found." }),
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(file), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        code: "SERVER_ERROR",
        message: "Error fetching file record.",
      }),
      { status: 500 },
    );
  }
}
