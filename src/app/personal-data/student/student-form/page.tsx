'use client';

import { AuthProvider } from '@/app/context/provider';
import StudentForm from '@/components/studentData/StudentForm';

export default function personalData() {
    return (
        <AuthProvider>
            <StudentForm />
        </AuthProvider>
    );
}
