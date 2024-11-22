import { AuthProvider } from '@/app/context/provider';
import AttendanceForm from '@/components/attendance/FormAttendance';

export default function formAttendance() {
    return (
        <AuthProvider>
            <AttendanceForm />
        </AuthProvider>
    );
}
