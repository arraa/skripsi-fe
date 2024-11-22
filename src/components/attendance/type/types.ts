export interface AttendanceProps {
    id?: number;
    date: string;
    hadir: number;
    sakit: number;
    alfa: number;
}

export interface AttendanceFormProps {
    id: number;
    student_id: string;
    date: Date;
    reason: string;
    sex?: string;
}

export type AttendanceFormData = {
    [key: string]: {
        reason: string;
    };
};
