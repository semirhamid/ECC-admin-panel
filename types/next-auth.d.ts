import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      phoneNumber: string;
      email: string;
      profileImageUrl: string;
      role: string;
      accessToken: string;
    };
  }
}