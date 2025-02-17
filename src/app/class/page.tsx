
import ClassData from '@/components/classGenerator/ClassData'
import { Suspense } from 'react'

export default function calendar() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ClassData />
            </Suspense>
        </>
    )
}
