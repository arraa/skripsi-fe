interface SubjectDataProps {
    subject_id: number
    grade: number
    subject_name: string
    subject_duration_minutes: number
}

interface SubjecListApiProps {
	subjects: SubjectDataProps[]
}