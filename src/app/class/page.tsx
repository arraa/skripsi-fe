import Class from '@/components/classGenerator/Class'
import { Suspense } from 'react'

export default function calendar() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Class />
            </Suspense>
        </>
    )
}
