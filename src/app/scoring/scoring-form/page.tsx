import { AuthProvider } from '@/app/context/provider';
import ScoringForm from '@/components/scoring/ScoringForm';
export default function scoringForm() {
    return (
        <AuthProvider>
            <ScoringForm/>
        </AuthProvider>
    );
}
