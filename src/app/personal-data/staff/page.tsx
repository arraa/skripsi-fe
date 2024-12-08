import { AuthProvider } from '@/app/context/provider';
import StaffData from '@/components/staffData/StaffData';

export default async function PersonalData() {
    return (
        <AuthProvider>
            <StaffData />
        </AuthProvider>
    );
}
