import { AxiosResponse } from 'axios';
import { api } from './axios';
import { formatDate } from '@/lib/formatData';
import { AllStudentAttendanceByClassIDAndDateProps } from '@/components/attendance/type/types';

export interface AttendanceByMonthApiProps {
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

export const getAttendanceByMonth = async (classID: number, date: Date): Promise<AttendanceByMonthApiProps> => {
    const formatedDate = formatDate(date);
    try {
        const response: AxiosResponse<AttendanceByMonthApiProps> = await api.get(
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

export interface AllStudentAttendanceByClassIDAndDateApiProps {
    attendance: AllStudentAttendanceByClassIDAndDateProps[];
}


export const getAllStudentAttendanceByClassIDAndDate = async (
    classID: number,
    date: Date
): Promise<AllStudentAttendanceByClassIDAndDateApiProps> => {
    const formatedDate = formatDate(date);
    try {
        const response: AxiosResponse<AllStudentAttendanceByClassIDAndDateApiProps> =
            await api.get(`/attendance/all-student/${classID}/${formatedDate}`);
        if (response.status !== 200) {
            throw new Error('Error fetching attendance data');
        }

        return response.data;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};
