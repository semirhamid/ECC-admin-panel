'use client';

import { Spinner } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const allowedRoutes = ['/login', '/register', '/verification', '/forgot'];

  useEffect(() => {
    if (status === 'loading') return;
    const user = session?.user as any;
    if (status === 'unauthenticated' && !allowedRoutes.includes(pathname)) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        <Spinner className="h-12 w-12" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </main>
    );
  }

  return <main>{children}</main>;
}
