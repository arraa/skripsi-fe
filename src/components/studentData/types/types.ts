export interface createStudentProps {
    id: string,
    name: string
    gender: string
    place_of_birth: string
    date_of_birth:string
    religion: string
    address: string
    number_phone: string,
    email: string,
    accepted_date: string,
    school_origin: string,
    id_class: number
    father_name: string,
    father_job: string,
    father_number_phone: string,
    mother_name: string,
    mother_job: string,
    mother_number_phone:  string
}

export interface studentFormPageProps {
    typePage: string;
    id?: string;
}