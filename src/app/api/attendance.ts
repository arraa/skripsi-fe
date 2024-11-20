import { AxiosResponse } from 'axios';
import { api } from './axios';
import { formatDate } from '@/lib/formatData';

interface AttendanceApiProps {
    attendance: [
        {
            date: string;
            present_total: number;
            sick_total: number;
            leave_total: number;
            absent_total: number;
        }
    ];
}

export const getAttendanceByMonth = async (classID: number, date: Date): Promise<AttendanceApiProps> => {
    const formatedDate = formatDate(date);
    try {
        const response: AxiosResponse<AttendanceApiProps> = await api.get(
            `/attendance/summary/${classID}/${formatedDate}`
        );
        if (response.status !== 200) {
            throw new Error('Error fetching attendance data');
        }

        return response.data;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
