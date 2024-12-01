export interface TeacherDataProps {
    teacher_id?: number;
    user_id?: number;
    name: string;
    gender: string;
    place_of_birth: string;
    date_of_birth: string;
    religion: string;
    address: string;
    num_phone: string;
    email: string;
    teaching_hour: string;
}

export interface GetTeacherByIDApiProps {
    teacher: TeacherDataProps;
}

export interface studentFormPageProps {
    typePage: string;
    id?: string;
}

export interface classDataProps {
    id: number;
    name: string;
    grade: string;
}

export interface subjectListProps {
    id: number;
    grade: number;
    name: string;
}
