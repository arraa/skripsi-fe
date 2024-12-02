import { StudentDataProps } from '@/components/studentData/types/types'
import { api } from './axios'
import { AxiosResponse } from 'axios'

export const getStudent = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get('/student')
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error(String(error)))
    }
}

interface StudentClassIDApiProps {
    students: StudentDataProps[]
}
export const getStudentClassNameID = async (
    classID: string | number
): Promise<AxiosResponse<StudentClassIDApiProps>> => {
    try {
        const response = await api.get(`/student/class/${classID}`)
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error(String(error)))
    }
}

export const getStudentById = async (id: string): Promise<AxiosResponse> => {
    try {
        const response = await api.get(`/student/${id}`)

        if (response.status !== 200) {
            throw new Error('Error fetching student data')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error(String(error)))
    }
}

export const createStudent = async (
    props: StudentDataProps
): Promise<AxiosResponse> => {
    const { name, gender, date_of_birth } = props

    if (!name || !gender || !date_of_birth) {
        throw new Error('Missing required fields')
    }

    const data = {
        ...props,
        number_phone: props.number_phone.toString(),
        father_number_phone: props.father_number_phone.toString(),
        mother_number_phone: props.mother_number_phone.toString(),
    }

    try {
        const response = await api.post('/student/create', data)
        return response
    } catch (error) {
        console.error('Error:', error)
        return Promise.reject(new Error(String(error)))
    }
}

export const createStudentbyExcel = async (
    props: StudentDataProps[]
): Promise<AxiosResponse> => {
    const data = {
        'student-data': props,
    }

    try {
        const response = await api.post('//student/create-all', data)

        return response
    } catch (error) {
        console.log('create excel error:', error)
        return Promise.reject(new Error(String(error)))
    }
}

export const updateStudent = async (
    getid: string,
    props: StudentDataProps
): Promise<AxiosResponse> => {
    const { name, gender, date_of_birth } = props

    if (!name || !gender || !date_of_birth) {
        throw new Error('Missing required fields')
    }

    const data = {
        ...props,
        number_phone: props.number_phone.toString(),
        father_number_phone: props.father_number_phone.toString(),
        mother_number_phone: props.mother_number_phone.toString(),
    }

    try {
        const response = await api.put(`/student/update/${getid}`, data)
        return response // Ensure to return the response data
    } catch (error) {
        console.error('Update error:', error) // Log the error
        return Promise.reject(new Error(String(error)))
    }
}

export const deleteStudent = async (
    id: string | null
): Promise<AxiosResponse> => {
    if (id) {
        try {
            const response = await api.delete(`/student/delete/${id}`)
            return response
        } catch (error) {
            console.error('API request error', error)
            return Promise.reject(new Error(String(error)))
        }
    }
    return Promise.reject(new Error('No student id provided'))
}
