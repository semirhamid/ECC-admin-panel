import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }: { user: any; token: any }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token as any
      return session;
    }, async signIn({ user, account, profile, email, credentials }) {
      return true
    }
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const res = await response.json();
          console.log(res)
          if (res) {
            return res.user
          } else {
            return null;
          }
        } catch (err: any) {
          console.log(err)
        }
      }
      ,
    }),
  ],
};