import { AxiosResponse } from 'axios'
import { api } from './axios'

const routeAssignment = '/assignment'

interface AssignmentDataApi {
    AssignmentId: number
    assignment_type: string
}

interface ScoreClassSubject {
    assignment: AssignmentDataApi
}

export const validateCreateOrGetAsgType = async (
    AssignmentType: string
): Promise<AxiosResponse<ScoreClassSubject>> => {
    try {
        const response = await api.post(`${routeAssignment}`, {
            assignment_type: AssignmentType,
        })
        if (response.status !== 200) {
            throw new Error('API request error')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(new Error('API request error'))
    }
}

export const getClassListTeachingSubject = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get(
            'scoring/get-all-class-teaching-subject-teacher'
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
