import { AuthProvider } from '@/app/context/provider';
import TeacherData from '@/components/teacherData/TeacherData';

export default async function PersonalData() {
    return (
        <AuthProvider>
            <TeacherData />
        </AuthProvider>
    );
}
