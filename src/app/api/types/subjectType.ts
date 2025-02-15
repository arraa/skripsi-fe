interface SubjectDataProps {
    subject_id: number
    grade: number
    subject_name: string
    subject_duration_session: number
    subject_duration_per_week: number
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

interface SubjectClassDataWithStudentProps extends SubjectClassDataProps {
    students: {
        StudentID: number
        name: string
    }[]
}

interface SubjectClassApiProps {
    subject: SubjectClassDataWithStudentProps
}

interface StudentScoringFormProps {
    id: number
    score: number
    StudentID: number
    StudentName: string
}
