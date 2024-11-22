import { AuthProvider } from '@/app/context/provider';
import AttandanceToday from '@/components/attandance/TodayAttandance';

export default function todayAttendance() {
    return (
        <AuthProvider>
            <AttandanceToday />
        </AuthProvider>
    );
}
