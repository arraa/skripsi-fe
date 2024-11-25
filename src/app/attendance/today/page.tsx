import { AuthProvider } from '@/app/context/provider';
import AttendanceToday from '@/components/attendance/TodayAttendance';

export default function todayAttendance() {
    return (
        <AuthProvider>
            <AttendanceToday />
        </AuthProvider>
    );
}
