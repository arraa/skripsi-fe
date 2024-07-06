
import { createStudentProps } from '@/components/studentData/types/types';
import { api } from './axios';

export const getStudent = async () => {
    try {
        const respon = await api.get('api/v1/student/');
        return respon.data;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};


export const getStudentById = async (id : number) => {
    try {
        const respon = await api.get('api/v1/student/${id}');
        return respon.data;
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
};


export const createStudent = async ( props: createStudentProps ) => {
    const { NISN, fullName, gender, class: className, POB, DOB, religion, email, acceptedDate, schoolOrigin, fatherName, fatherJob, fatherPhoneNumber, motherName, motherJob, motherPhoneNumber } = props;

    const formData = new FormData();
    formData.append('NISN',NISN);
    formData.append('fullName',fullName);
    formData.append('gender',gender);
    formData.append('className',className);
    formData.append('POB',POB);
    formData.append('DOB',DOB);
    formData.append('religion',religion);
    formData.append('email',email);
    formData.append('acceptedDate',acceptedDate);
    formData.append('schoolOrigin',schoolOrigin);
    formData.append('fatherName',fatherName);
    formData.append('fatherJob',fatherJob);
    formData.append('fatherPhoneNumber',fatherPhoneNumber);
    formData.append('motherName',motherName);
    formData.append('motherJob',motherJob);
    formData.append('motherPhoneNumber',motherPhoneNumber);

    return api.post('api/v1/create', formData);
};

export const updateStudent = async (
    id : number,
    props: createStudentProps  
) => {
    const { NISN, fullName, gender, class: className, POB, DOB, religion, email, acceptedDate, schoolOrigin, fatherName, fatherJob, fatherPhoneNumber, motherName, motherJob, motherPhoneNumber } = props;

    const formData = new FormData();
    formData.append('NISN',NISN);
    formData.append('fullName',fullName);
    formData.append('gender',gender);
    formData.append('className',className);
    formData.append('POB',POB);
    formData.append('DOB',DOB);
    formData.append('religion',religion);
    formData.append('email',email);
    formData.append('acceptedDate',acceptedDate);
    formData.append('schoolOrigin',schoolOrigin);
    formData.append('fatherName',fatherName);
    formData.append('fatherJob',fatherJob);
    formData.append('fatherPhoneNumber',fatherPhoneNumber);
    formData.append('motherName',motherName);
    formData.append('motherJob',motherJob);
    formData.append('motherPhoneNumber',motherPhoneNumber);

    return api.post('api/v1/update/${id}', formData);
};

export const deleteStudent = async ( id : number) => {
    return api.delete('api/v1/delete/${id}');
}