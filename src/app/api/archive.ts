import { AxiosResponse } from 'axios'
import { api } from './axios'

export const getAcademicYear = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/academic-year')
        if (response.status !== 200) {
            throw new Error('Error fetching student data')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}

export const getAttendance = async (
    academicYear: string,
    classID: number
): Promise<AxiosResponse> => {
    try {
        const [startYear, endYear] = academicYear.split('/')

        const response = await api.get(
            `/archive/student-attendance/${startYear}/${endYear}/${classID}`
        )
        if (response.status !== 200) {
            throw new Error('Error fetching student data')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}

export const getStudentArchive = async (
    academicYear: string
): Promise<AxiosResponse> => {
    try {
        const [startYear, endYear] = academicYear.split('/')

        const response = await api.get(
            `/archive/student-personal-data/${startYear}/${endYear}`
        )
        if (response.status !== 200) {
            throw new Error('Error fetching student data')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}


export const getArchiveClass = async (
    academicYear: string,
    gradeID: number
): Promise<AxiosResponse> => {
    try {
        const [startYear, endYear] = academicYear.split('/')

        const response = await api.get(
            `/archive/class/${startYear}/${endYear}/${gradeID}`
        )
        if (response.status !== 200) {
            throw new Error('Error fetching student data')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        throw error
    }
}
