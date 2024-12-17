import CalendarForm from '@/components/calendar/CalendarForm'
import { Suspense } from 'react'

export default function calendar() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <CalendarForm />
            </Suspense>
        </>
    )
}
