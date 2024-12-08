export interface StudentScoringPerSubject {
    id?: number
    StudentID?: number
    ScoringID?: number
    StudentName: string
    Scores: ScoringItem[]
}

export interface ScoringItem {
    SubjectID: number
    AssignmentID: number
    TeacherID: number
    AssignmentType: string
    SubjectName: string
    Score: number
}

export interface StudentScoringPerSubject {
    id?: number
    StudentID?: number
    ScoringID?: number
    StudentName: string
    Scores: ScoringItem[]
}

export interface StudentScoringPerSubjectForm {
    [key: string]: {
        score?: number
        reason?: string
    }
}

export interface SubjectClassDataProps {
    subject_id: number
    class_name_id: number
    grade_class_name: string
    subject_name: string
}
