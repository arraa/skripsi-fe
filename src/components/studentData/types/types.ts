export interface createStudentProps {
    NISN: string;
    fullName: string;
    gender: string;
    class: string;
    POB: string;
    DOB: string;
    religion: string;
    email: string;
    acceptedDate: string;
    schoolOrigin: string;
    fatherName: string;
    fatherJob: string;
    fatherPhoneNumber: string;
    motherName: string;
    motherJob: string;
    motherPhoneNumber: string;
}

export interface studentFormPageProps {
    typePage: string;
    id: number | null;
}