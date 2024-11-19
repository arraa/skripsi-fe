'use client';

import { AuthProvider } from '@/app/context/provider';
import StudentForm from '@/components/studentData/StudentForm';
import { Suspense } from 'react';

export default function personalData() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <StudentForm />
      </Suspense>
    </AuthProvider>
  );
}
