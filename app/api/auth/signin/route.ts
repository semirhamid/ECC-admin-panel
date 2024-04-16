import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, signInUser } from "@/services/auth.service";

type SignInData = {
  email: string;
  password: string;
};

function validateSignInData({ email, password }: SignInData): string | null {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) return "Invalid email format.";

  if (!password) return "Password must not be empty.";

  return null;
}

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as SignInData;
  const validationError = validateSignInData({ email, password });
  if (validationError) {
    return new NextResponse(JSON.stringify({ message: validationError }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const token = await signInUser(email, password);
    const userData = await getUserByEmail(email);
    console.log(token, userData)
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }
    if (!userData) {
      return new NextResponse(
        JSON.stringify({ message: "Error signing in user" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
    const { password: _, ...userWithOutToken } = userData;
    const user = { ...userWithOutToken, accessToken: token }
    return new NextResponse(JSON.stringify({ token, user }), {
      status: 200,
      headers: { "Content-Type": "application/json", 'Set-Cookie': `token=${token}` },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Error signing in user", error }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
