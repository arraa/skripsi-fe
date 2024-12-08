import { AxiosResponse } from 'axios'
import { api } from './axios'
import { StudentScoringPerSubject } from '@/components/scoring/types/types'

const routeSubject = '/scoring'

interface ScoreClassSubject {
    score: StudentScoringPerSubject[]
}

export const getAllScoreByClassAndSubject = async (
    classID: number,
    subjectID: number
): Promise<AxiosResponse<ScoreClassSubject>> => {
    try {
        const response = await api.get(`${routeSubject}/${subjectID}/${classID}`)
        if (response.status !== 200) {
            throw new Error('API request error')
        }
        return response
    } catch (error) {
        console.error('API request error', error)
        return Promise.reject(error)
    }
}
