import { StudentDataProps } from '@/components/studentData/types/types';
import { api } from './axios';

export const getStudent = async () => {
    try {
        const response = await api.get('/student/');
        return response;
    } catch (error: any) {
        console.error('API request error', error);
        return error.response;
    }
};

export const getStudentById = async (id: string) => {
    try {
        const response = await api.get(`/student/${id}`);

        if (response.status !== 200) {
            throw new Error('Error fetching student data');
        }
        return response;
    } catch (error: any) {
        console.error('API request error', error);
        return error.response;
    }
};

export const createStudent = async (props: StudentDataProps) => {
    const { name, gender, date_of_birth } = props;

    if (!name || !gender || !date_of_birth) {
        throw new Error('Missing required fields');
    }

    const data = {
        ...props,
        number_phone: props.number_phone.toString(),
        father_number_phone: props.father_number_phone.toString(),
        mother_number_phone: props.mother_number_phone.toString(),
    };

    try {
        const response = await api.post('/student/create', data);
        console.log('Response:', response.data);
        return response.data;
    } catch (error:any) {
        console.error('Error:', error);
        return error.response;
    }
};

export const createStudentbyExcel = async (props: StudentDataProps[]) => {
    const data = {
        'student-data': props,
    };

    try {
        const response = await api.post('//student/create-all', data);
        console.log('create excel response:', response.data);

        return response.data;
    } catch (error: any) {
        console.log('create excel error:', error.response.data.error);
        return error.response;
    }
};

export const updateStudent = async (getid: string, props: StudentDataProps) => {
    const { name, gender, date_of_birth } = props;

    if (!name || !gender || !date_of_birth) {
        throw new Error('Missing required fields');
    }

    const data = {
        ...props,
        number_phone: props.number_phone.toString(),
        father_number_phone: props.father_number_phone.toString(),
        mother_number_phone: props.mother_number_phone.toString(),
    };

    try {
        const response = await api.put(`/student/update/${getid}`, data);
        console.log('Update response:', response.data); // Log the response
        return response.data; // Ensure to return the response data
    } catch (error:any) {
        console.error('Update error:', error); // Log the error
        return error.response;
    }
};

export const deleteStudent = async (id: string | null) => {
    if (id) {
        return api.delete(`/student/delete/${id}`);
    }
};
