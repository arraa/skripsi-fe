interface SubjectDataProps {
    subject_id: number
    grade: number
    subject_name: string
    subject_duration_minutes: number
}

interface SubjecListApiProps {
	subjects: SubjectDataProps[]
}

export interface SubjectClassDataProps {
    subject_id: number,
    grade_class_name: string,
    subject_name: string
}

interface SubjectClassListApiProps {
    subjects: SubjectClassDataProps[]
}