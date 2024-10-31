'use server';
import { StudentDataProps } from '@/components/studentData/types/types';
import { api } from './axios';
import { getAccessToken } from './token';

const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return 'Invalid Date';
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatStudentData = (data: any) => {
    if (Array.isArray(data)) {
        return data.map((student) => ({
            ...student,
            date_of_birth: formatDate(student.date_of_birth),
            accepted_date: formatDate(student.accepted_date),
        }));
    }

    return {
        ...data,
        date_of_birth: formatDate(data.date_of_birth),
        accepted_date: formatDate(data.accepted_date),
    };
};

export const getStudentById = async (id: string) => {
    try {
        const response = await api.get(`/student/${id}`, {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
        const data = formatStudentData(response.data.student);
        return data;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};

export const createStudent = async (props: StudentDataProps) => {
    // Validation
    if (!props.name || !props.gender || !props.date_of_birth) {
        throw new Error('Missing required fields');
    }

    const {
        nisn,
        name,
        gender,
        id_class,
        place_of_birth,
        date_of_birth,
        religion,
        address,
        number_phone,
        email,
        accepted_date,
        school_origin,
        father_name,
        father_job,
        father_number_phone,
        mother_name,
        mother_job,
        mother_number_phone,
    } = props;

    const data = {
        nisn,
        name,
        gender,
        id_class,
        place_of_birth,
        date_of_birth,
        religion,
        address,
        number_phone: number_phone.toString(),
        email,
        accepted_date,
        school_origin,
        father_name,
        father_job,
        father_number_phone: father_number_phone.toString(),
        mother_name,
        mother_job,
        mother_number_phone: mother_number_phone.toString(),
    };

    try {
        const response = await api.post('/student/create', data, {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
        console.log('Update response:', response.data); // Log the response
        return response.data; // Ensure to return the response data
    } catch (error) {
        console.error('Update error:', error); // Log the error
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const createStudentbyExcel = async (props: StudentDataProps[]) => {
    const data = {
        'student-data': props,
    };

    try {
        const response = await api.post('//student/create-all', data, {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
        console.log('create excel response:', response.data);

        return response.data;
    } catch (error: any) {
        console.log('create excel error:', error.response.data.error); // Log the error
        // return error.response.data.error
        throw error;
    }
};

export const updateStudent = async (getid: string, props: StudentDataProps) => {
    const {
        StudentID,
        name,
        gender,
        id_class,
        place_of_birth,
        date_of_birth,
        religion,
        address,
        number_phone,
        email,
        accepted_date,
        school_origin,
        father_name,
        father_job,
        father_number_phone,
        mother_name,
        mother_job,
        mother_number_phone,
    } = props;

    const data = {
        name,
        gender,
        id_class,
        place_of_birth,
        date_of_birth,
        religion,
        address,
        number_phone: number_phone.toString(),
        email,
        accepted_date,
        school_origin,
        father_name,
        father_job,
        father_number_phone: father_number_phone.toString(),
        mother_name,
        mother_job,
        mother_number_phone: mother_number_phone.toString(),
    };

    try {
        const response = await api.put(`/student/update/${getid}`, data, {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
        console.log('Update response:', response.data); // Log the response
        return response.data; // Ensure to return the response data
    } catch (error) {
        console.error('Update error:', error); // Log the error
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const deleteStudent = async (id: string | null) => {
    if (id) {
        return api.delete(`/student/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
            },
        });
    }
};
