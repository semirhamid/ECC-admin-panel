import { NextRequest, NextResponse } from "next/server";
import { changeProfileImage } from "@/services/user.service";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const formData = (await request.formData()) as FormData;
  let file = formData.get("file") as File;
  const userId = (formData.get("userId") || 0) as number;
  if (!userId) {
    return NextResponse.json(
      { message: "userId field is required" },
      { status: 400 },
    );
  }
  formData.forEach((value, key) => {
    if (value as File) {
      file = value as File;
    }
  });
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

  try {
    const result = await put(filename, file, {
      access: "public",
    });
    await changeProfileImage(Number(userId), result.url);

    return NextResponse.json({
      message: "Success",
      filename: result,
      status: 201,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({
      message: "Failed",
      error: "Error Occuerred",
      status: 500,
    });
  }
}
