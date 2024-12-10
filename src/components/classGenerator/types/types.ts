export interface TeacherDataProps {
    id: number
    teacher_id?: number
    user_id?: number
    name: string

    User: {
        name: string
    }
    gender: string
    place_of_birth: string
    date_of_birth: string
    religion: string
    address: string
    num_phone: string
    email: string
    teaching_hour: string
    subject: number[]
}

export interface classDataProps {
    id?: number
    id_grade: number
    id_teacher: number
    name: string
    Grade?: gradeDataProps
    Teacher?: TeacherDataProps
}

export interface classGeneratorProps {
    no: number
    name: string
    gender: string
    class: string
}
export interface gradeDataProps {
    id: number
    grade: string
}
