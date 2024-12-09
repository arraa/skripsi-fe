'use client';

import { AuthProvider } from '@/app/context/provider';
import TeacherForm from '@/components/teacherData/TeacherForm';
import { Suspense } from 'react';

export default function personalData() {
    return (
        <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <TeacherForm />
            </Suspense>
        </AuthProvider>
    );
}
