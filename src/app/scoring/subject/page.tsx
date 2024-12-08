import { AuthProvider } from '@/app/context/provider';
import ScoringPerSubject from '@/components/scoring/ScoringPerSubject';

export default function scoring() {
    return (
        <AuthProvider>
            <ScoringPerSubject />
        </AuthProvider>
    )
}
