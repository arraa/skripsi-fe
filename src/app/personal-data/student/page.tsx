import StudentData from '@/components/studentData/StudentData';
import { AuthProvider } from '@/app/context/provider';

export default async function PersonalData() {
    return (
        <AuthProvider>
            <StudentData />
        </AuthProvider>
    );
}
