import { ResetPasswordForm } from '@/components/auth/AuthComponent';
import { redirect } from 'next/navigation';

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const filters = (await searchParams) as {
        token: string;
        email: string;
    };
    if (filters === undefined) {
        redirect('/auth/login');
    }
    const token = filters.token;
    const email = filters.email;

    if (!token || !email) {
        redirect('/auth/login');
    }

    return <ResetPasswordForm token={token} email={email} />;
}
