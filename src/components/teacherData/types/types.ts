export interface UserDataProps {
    id?: string;
    name: string;
    gender: string;
    place_of_birth: string;
    date_of_birth: string;
    religion: string;
    address: string;
    num_phone: string;
    email: string;
}

export interface TeacherDataProps {
    TeacherID?: string;
    id_user?: string;
    user: UserDataProps;
}

export interface studentFormPageProps {
    typePage: string;
    id?: string;
}

export interface classDataProps {
    id: number;
    name: string;
    grade: string;
}
