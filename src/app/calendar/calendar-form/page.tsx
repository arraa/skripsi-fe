import calenderForm from '@/components/calender/calenderForm'
import { Suspense } from 'react'

export default function calender() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <calenderForm />
            </Suspense>
        </>
    )
}
