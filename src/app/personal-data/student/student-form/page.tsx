'use client'

import StudentForm from '@/components/studentData/StudentForm'
import { Suspense } from 'react'

export default function personalData() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentForm />
        </Suspense>
    )
}
