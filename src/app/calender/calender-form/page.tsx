import CalenderForm from '@/components/calender/CalenderForm'
import { Suspense } from 'react'

export default function Calender() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <CalenderForm />
            </Suspense>
        </>
    )
}
