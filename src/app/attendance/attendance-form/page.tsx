import AttendanceForm from '@/components/attendance/FormAttendance'
import { Suspense } from 'react'

export default function formAttendance() {
    return (
        <Suspense>
            <AttendanceForm />
        </Suspense>
    )
}
