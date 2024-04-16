'use client';
import { ReactNode } from 'react';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const loggedIn =
        pathname === '/login' || pathname === '/register' ? false : true;

    return (
        <main className='flex min-h-screen bg-gray-100'>
            <div className='h-screen sticky top-0 bg-white'>
                <Sidebar />
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='sticky shadow-sm top-0 z-50'>
                    <Navbar />
                </div>
                <div className='relative z-0 flex-1 overflow-y-auto bg-white p-9'>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default MainLayout;
