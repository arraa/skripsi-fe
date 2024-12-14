export interface teacher {
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

export interface classDataProps {
    id?: number;
    id_grade: number;
    id_teacher: number;
    name: string;
    Grade?: gradeDataProps;
}

export interface classGeneratorProps {
    no: number;
    name: string;
    gender: string;
    class: string;
}
export interface gradeDataProps {
    id: number;
    grade: string;
}

export interface subjectListProps {
    id: number
    name: string
    durationPerWeek:number
    durationPerSession:number
}
