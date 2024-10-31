import { IsNotLoggedIn } from '../context/provider';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <IsNotLoggedIn>
            <div className='flex min-h-screen items-center justify-center bg-gray-100'>
                <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
                    {children}
                    <p className='mt-6 text-center text-sm text-gray-500'>
                        Dont have an account?{' '}
                        <a
                            href='/register'
                            className='text-indigo-600 hover:text-indigo-500'
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </IsNotLoggedIn>
    );
}
