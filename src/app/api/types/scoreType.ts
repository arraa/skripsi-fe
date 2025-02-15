interface StudentScoresByStudentSubjectClassIDProps {
    student_name: string
    subject_name: string
    scores: {
        assignment_id: number
        assignment_type: string
        score: number
    }[]
}

interface StudentScoreGetByStudentSubjectClassIDProps {
	score: StudentScoresByStudentSubjectClassIDProps
}