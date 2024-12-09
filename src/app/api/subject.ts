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
        return Promise.reject(error)
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
        return Promise.reject(error)
    }
}
