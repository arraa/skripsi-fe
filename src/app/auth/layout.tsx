import { IsNotLoggedIn } from '../context/provider';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <IsNotLoggedIn>
            <div className='flex min-h-screen w-screen items-center justify-center bg-gray-100'>
                <div className='w-full rounded-lg bg-white  shadow-lg'>
                    {children}
                    
                </div>
            </div>
        </IsNotLoggedIn>
    );
}
