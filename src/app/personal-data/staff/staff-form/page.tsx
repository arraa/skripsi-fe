'use client';

import { AuthProvider } from '@/app/context/provider';
import StaffForm from '@/components/staffData/StaffForm';
import { Suspense } from 'react';

export default function personalData() {
    return (
        <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <StaffForm />
            </Suspense>
        </AuthProvider>
    );
}
