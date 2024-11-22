import { AuthProvider } from '@/app/context/provider';
import AttendanceSummary from '@/components/attendance/Summary';

export default function todayAttendance() {
    return (
        <AuthProvider>
            <AttendanceSummary />
        </AuthProvider>
    );
}
