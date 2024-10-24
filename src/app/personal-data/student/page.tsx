import StudentData from '@/components/studentData/StudentData';
import { redirect } from 'next/navigation';
import { getAccessToken } from '../../api/token';


export default async function PersonalData() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        redirect('/auth/login');
    }
    return (
        <>
            <StudentData/>
        </>
    );
}
