import { SummaryAttendanceByClassIDAndYearApiProps } from '../../../app/api/attendance';
export interface AttendanceProps {
    id?: number;
    date: string;
    hadir: number;
    sakit: number;
    alfa: number;
}

export interface AttendanceListFormProps {
    id: number;
    student_id: string;
    name: string;
    sex: string;
    reason: string;
    date: Date;
};

export type AttendanceFormData = {
    [key: string]: {
        reason: string;
    };
};

export interface AllStudentAttendanceByClassIDAndDateProps {
    id: number;
    name: string;
    sex: string;
    reason: string;
    date: string;
}

export interface SummaryAttendanceShowProps {
    id: number
    name: string
    hadir: number
    sakit: number
    izin: number
    alfa: number
}
