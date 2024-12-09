import { AuthProvider } from '@/app/context/provider';
import AttendanceForm from '@/components/attendance/FormAttendance';
import { Suspense } from 'react';

export default function formAttendance() {
    return (
        <AuthProvider>
            <Suspense>
                <AttendanceForm />
            </Suspense>
        </AuthProvider>
    );
}
