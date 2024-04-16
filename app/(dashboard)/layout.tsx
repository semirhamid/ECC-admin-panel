import MainLayout from "@/components/layout/layout";
import SessionProvider from "@/utils/SessionProvider";
import { authOptions } from "@/utils/authOption";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
    if(!session?.user) {
      console.log("Redirecting")
      redirect('/login');
    }
  return (
    <SessionProvider session={session}>
      <MainLayout>{children}</MainLayout>
    </SessionProvider>
  );
}
