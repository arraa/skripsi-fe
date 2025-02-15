export interface StaffDataProps {
    id?: number
    staff_id?: number
    user_id?: number
    name: string
    gender: string
    place_of_birth: string
    date_of_birth: string
    religion: string
    address: string
    num_phone: string
    email: string
    position: string
}

export interface GetStaffByIDApiProps {
    staff: StaffDataProps
}

export interface staffFormPageProps {
    typePage: string
    id?: string
}

// export interface classDataProps {
//     id: number
//     name: string
//     grade: string
// }

// export interface subjectListProps {
//     id: number
//     grade: number
//     name: string
// }
