import StudentData from '@/components/studentData/StudentData'
import { Suspense } from 'react'

export default async function PersonalData() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentData />
        </Suspense>
    )
}
