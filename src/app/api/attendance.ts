import { AxiosResponse } from 'axios';
import { api } from './axios';
import { formatDate } from '@/lib/formatData';

export const getAttendanceByMonth= async (classID: number, date: Date): Promise<AxiosResponse> => {
    const formatedDate = formatDate(date);
    try {
        const response = await api.get(
            `/attendance/summary/${classID}/${formatedDate}`
        );
        if (response.status !== 200) {
            throw new Error('Error fetching attendance data');
        }
        return response;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
