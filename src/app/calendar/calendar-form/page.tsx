import CalendarForm from '@/components/calender/CalenderForm'
import { Suspense } from 'react'

export default function calender() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <CalendarForm/>
            </Suspense>
        </>
    )
}
