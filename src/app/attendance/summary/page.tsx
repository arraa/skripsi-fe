import AttendanceSummary from '@/components/attendance/Summary'
import { Suspense } from 'react'

export default function todayAttendance() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AttendanceSummary />
        </Suspense>
    )
}
