interface SubjectDataProps {
    subject_id: number
    grade: number
    subject_name: string
    subject_duration_minutes: number
}

interface SubjecListApiProps {
    subjects: SubjectDataProps[]
}

interface SubjectClassDataProps {
    subject_id: number
    class_name_id: number
    grade_class_name: string
    subject_name: string
}

interface SubjectClassListApiProps {
    subjects: SubjectClassDataProps[]
}
