export interface TeacherProps {
    Teacher: {
        TeacherID: number;
        id_user: number;
        teaching_hour: number;
        ClassNames: null;
        User: {
            id: number;
            name: string;
            gender: string;
            place_of_birth: string;
            date_of_birth: string;
            address: string;
            num_phone: string;
            email: string;
        };
    };
}

export interface ClassDataProps {
    id?: number;
    id_grade: number;
    id_teacher: number;
    name: string;
    Grade?: GradeDataProps;
}

export interface ClassGeneratorProps {
    no: number;
    name: string;
    gender: string;
    class: string;
}
export interface GradeDataProps {
    id: number;
    grade: string;
}

export interface SubjectListProps {
    id: number
    name: string
    durationPerWeek:number
    durationPerSession:number
}
