import { StudentDataProps } from '@/components/studentData/types/types'
import * as XLSX from 'xlsx'

export const formatDate = (date: string | Date): string => {
    const d = new Date(date)
    if (isNaN(d.getTime())) {
        return 'Invalid Date'
    }
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const formatDateForm = (date: number) => {
    const dateFormated = XLSX.SSF.parse_date_code(date)
    return new Date(dateFormated.y, dateFormated.m - 1, dateFormated.d)
        .toISOString()
        .split('T')[0]
}

export const formatStudentData = (data: any, includedIdClass = true) => {
    if (Array.isArray(data)) {
        return data.map((student: StudentDataProps) => ({
            ...student,
            date_of_birth: formatDate(student.date_of_birth),
            accepted_date: formatDate(student.accepted_date),
            ...(includedIdClass && {
                class_id:
                    student.ClassName.Grade.grade + student.ClassName.name,
            }),
        }))
    }

    return {
        ...data,
        date_of_birth: formatDate(data.date_of_birth),
        accepted_date: formatDate(data.accepted_date),
        ...(includedIdClass && {
            class_id: data.ClassName.Grade.grade + data.ClassName.name,
        }),
    }
}

export const formatPhoneNumber = (number: string) => {
    if (!number) return ''

    if (number.startsWith('0')) {
        return `+62${number.slice(1)}`
    } else if (number.startsWith('62')) {
        return `+${number}`
    } else if (number.startsWith('+62')) {
        return number
    }

    return number
}
