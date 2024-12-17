'use client'

import TeacherForm from '@/components/teacherData/TeacherForm'
import { Suspense } from 'react'

export default function personalData() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TeacherForm />
        </Suspense>
    )
}
