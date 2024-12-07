import { AuthProvider } from '@/app/context/provider';
import ScoringForm from '@/components/scoring/AddScoringPerSubject';
import ScoringEditForm from '@/components/scoring/ScoringEditForm';

export default function scoringForm() {
    return (
        <AuthProvider>
            <ScoringEditForm/>
        </AuthProvider>
    );
}
