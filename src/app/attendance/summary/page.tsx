import { AuthProvider } from '@/app/context/provider';
import AttandanceSummary from '@/components/attandance/Summary';

export default function todayAttendance() {
    return (
        <AuthProvider>
            <AttandanceSummary />
        </AuthProvider>
    );
}
