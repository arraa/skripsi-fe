import ScoringForm from '@/components/scoring/ScoringForm'
import { Suspense } from 'react'
export default function scoringForm() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ScoringForm />
        </Suspense>
    )
}
