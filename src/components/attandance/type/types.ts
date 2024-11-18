export interface AttandanceProps {
    id?: number;
    date: string;
    hadir: number;
    sakit: number;
    alfa: number;
  }

  export interface AttandanceFormProps {
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