import ScoringPerSubject from '@/components/scoring/ScoringPerSubject';
import { AuthProvider } from '../context/provider';

export default function scoring() {
    return (
        <AuthProvider>
            <ScoringPerSubject/>
        </AuthProvider>
    );
}
