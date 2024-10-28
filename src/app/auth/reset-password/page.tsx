import { redirect } from 'next/navigation';

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const filters = (await searchParams) as {
        token: string;
        email: string
    };
    if (filters === undefined) {
        redirect('/auth/login');
    }
    const token = filters.token;
    const email = filters.email;

    if (!token || !email) {
        redirect('/auth/login');
    }

    return (
        <>
            <p className='text-indigo-600'>{token}</p>
            <p className='text-indigo-600'>{email}</p>
        </>
    );
}
