import { AxiosResponse } from 'axios'
import { api } from './axios'
import { formatDate } from '@/lib/formatData'
import { AllStudentAttendanceByClassIDAndDateProps } from '@/components/attendance/type/types'

export interface AttendanceByMonthApiProps {
    attendance: [
        {
            date: string
            present_total: number
            sick_total: number
            leave_total: number
            absent_total: number
        }
    ]
}

export const getAttendanceByMonth = async (
    classID: number,
    date: Date
): Promise<AttendanceByMonthApiProps> => {
    const formatedDate = formatDate(date)
    try {
        const response: AxiosResponse<AttendanceByMonthApiProps> =
            await api.get(`/attendance/summary/${classID}/${formatedDate}`)
        if (response.status !== 200) {
            throw new Error('Error fetching attendance data')
        }

        return response.data
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}

export interface AllStudentAttendanceByClassIDAndDateApiProps {
    attendance: AllStudentAttendanceByClassIDAndDateProps[]
}

export const getAllStudentAttendanceByClassIDAndDate = async (
    classID: number,
    date: Date
): Promise<AllStudentAttendanceByClassIDAndDateApiProps> => {
    const formatedDate = formatDate(date)
    try {
        const response: AxiosResponse<AllStudentAttendanceByClassIDAndDateApiProps> =
            await api.get(`/attendance/all-student/${classID}/${formatedDate}`)
        if (response.status !== 200) {
            throw new Error('Error fetching attendance data')
        }

        return response.data
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}

interface CreateAttendanceApiProps {
    message: string
}

export interface AttendancePropsSubmitApi {
    classID: number
    date: Date
    data: { student_id: string; reason: string }[]
}

export const createAttendance = async ({
    classID,
    date,
    data,
}: AttendancePropsSubmitApi): Promise<CreateAttendanceApiProps> => {
    const formatedDate = formatDate(date)
    try {
        const response: AxiosResponse<CreateAttendanceApiProps> =
            await api.post(`/attendance/${classID}`, {
                student: data,
            })
        if (response.status !== 200) {
            throw new Error('Error creating attendance data')
        }

        return response.data
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}

export const updateAttendance = async ({
    classID,
    date,
    data,
}: AttendancePropsSubmitApi): Promise<CreateAttendanceApiProps> => {
    const formatedDate = formatDate(date)
    try {
        const response: AxiosResponse<CreateAttendanceApiProps> = await api.put(
            `/attendance/${classID}/${formatedDate}`,
            {
                student: data,
            }
        )
        if (response.status !== 200) {
            throw new Error('Error updating attendance data')
        }

        return response.data
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}

interface SummaryAttendanceByClassIDAndYearProps {
    student_id: number
    student_name: string
    present_total: number
    sick_total: number
    leave_total: number
    absent_total: number
}

export interface SummaryAttendanceByClassIDAndYearApiProps {
    attendance: SummaryAttendanceByClassIDAndYearProps[]
}

export const getAllSummaryAttendanceByClassIDAndYear = async (
    classID: number
): Promise<SummaryAttendanceByClassIDAndYearApiProps> => {
    const year = new Date().getFullYear()
    try {
        const response: AxiosResponse<SummaryAttendanceByClassIDAndYearApiProps> =
            await api.get(`/attendance/summaries/${classID}/${year}`)
        if (response.status !== 200) {
            throw new Error('Error fetching attendance data')
        }

        return response.data
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}
