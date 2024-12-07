import { AuthProvider } from '@/app/context/provider';
import ScoringSummary from '@/components/scoring/ScoringSummary';

export default function scoring() {
    return (
        <AuthProvider>
            <ScoringSummary/>
        </AuthProvider>
    );
}
