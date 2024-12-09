import { AuthProvider } from '@/app/context/provider';
import ScoringForm from '@/components/scoring/ScoringForm';
import { Suspense } from 'react';
export default function scoringForm() {
    return (
        <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <ScoringForm />
            </Suspense>
        </AuthProvider>
    )
}
