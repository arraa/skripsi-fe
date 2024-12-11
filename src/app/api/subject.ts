import { AxiosResponse } from 'axios'
import { api } from './axios'
import { date } from 'valibot'

const routeSubject = '/subject'

export const getAllSubject = async (): Promise<
    AxiosResponse<SubjecListApiProps>
> => {
    try {
        const response = await api.get(routeSubject)
        if (response.status !== 200) {
            throw new Error('API request error')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error('API request error'))
    }
}

export const getAllSubjectClassName = async (): Promise<
    AxiosResponse<SubjectClassListApiProps>
> => {
    try {
        const response = await api.get(`${routeSubject}/class`)
        if (response.status !== 200) {
            throw new Error('API request error')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error('API request error'))
    }
}

export const getSubjectClassNameById = async (
    subjectID: number,
    classID: number
): Promise<AxiosResponse<SubjectClassApiProps>> => {
    try {
        const response = await api.get(
            `${routeSubject}/${subjectID}/${classID}`
        )
        if (response.status !== 200) {
            throw new Error('API request error')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error('API request error'))
    }
}

export const createSubjectScoringStudentsClass = async (
    subjectID: number,
    classID: number
): Promise<AxiosResponse<SubjectClassApiProps>> => {
    try {
        const response = await api.post(`${routeSubject}/${subjectID}/${classID}`)
        if (response.status !== 200) {
            throw new Error('API request error')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error('API request error'))
    }
}

