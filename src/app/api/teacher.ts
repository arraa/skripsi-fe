import { AxiosResponse } from 'axios';
import { api } from './axios';
import { TeacherDataProps } from '@/components/teacherData/types/types';
import { teacher } from '../../components/classGenerator/types/types';

const routeTeacher = '/teacher';

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

// const formatStudentData = (data: any) => {
//   if (Array.isArray(data)) {
//     return data.map((student) => ({
//       ...student,
//       date_of_birth: formatDate(student.date_of_birth),
//       accepted_date: formatDate(student.accepted_date),
//     }));
//   }

//   return {
//     ...data,
//     date_of_birth: formatDate(data.date_of_birth),
//     accepted_date: formatDate(data.accepted_date),
//   };
// };

export const getTeacher = async () => {
    try {
        const response = await api.get('/teacher/');
        return response;
    } catch (error: any) {
        console.error('API request error', error);
        return error.response;
    }
};

export const getTeacherById = async (
    id: string
): Promise<AxiosResponse<TeacherDataProps>> => {
    try {
        const response = await api.get(`${routeTeacher}/${id}`);
        return response;
    } catch (error: any) {
        console.error('API request error', error);
        return error.response;
    }
};

export const createTeacher = async (props: TeacherDataProps) => {

    const data = {
        teacher_id: props.teacher_id,
        user_id: props.user_id,
        name: props.name,
        gender: props.gender,
        place_of_birth: props.place_of_birth,
        date_of_birth: props.date_of_birth,
        religion: props.religion,
        address: props.address,
        num_phone: props.num_phone,
        email: props.email,
        teaching_hours: props.teaching_hours
    };

    try {
        const response = await api.post(`${routeTeacher}/create`, data);
        console.log('Update response:', response.data); // Log the response
        return response.data; // Ensure to return the response data
    } catch (error: any) {
        console.error('Update error:', error);
        return error.response;
    }
};

// export const createStudentbyExcel = async (props: StudentDataProps[]) => {

//   const data = {
//     'student-data': props
//   }

//   try {
//     const response = await api.post('//student/create-all', data);
//     console.log('create excel response:', response.data);

//     return response.data;
//   } catch (error : any) {
//     console.log('create excel error:', error.response.data.error); // Log the error
//     // return error.response.data.error
//     throw error;
//   }
// };

// export const updateStudent = async (getid: string, props: StudentDataProps) => {
//   const {
//     StudentID,
//     name,
//     gender,
//     id_class,
//     place_of_birth,
//     date_of_birth,
//     religion,
//     address,
//     number_phone,
//     email,
//     accepted_date,
//     school_origin,
//     father_name,
//     father_job,
//     father_number_phone,
//     mother_name,
//     mother_job,
//     mother_number_phone,
//   } = props;

//   const data = {
//     name,
//     gender,
//     id_class,
//     place_of_birth,
//     date_of_birth,
//     religion,
//     address,
//     number_phone: number_phone.toString(),
//     email,
//     accepted_date,
//     school_origin,
//     father_name,
//     father_job,
//     father_number_phone: father_number_phone.toString(),
//     mother_name,
//     mother_job,
//     mother_number_phone: mother_number_phone.toString(),
//   };

//   try {
//     const response = await api.put(`/student/update/${getid}`, data);
//     console.log('Update response:', response.data); // Log the response
//     return response.data; // Ensure to return the response data
//   } catch (error) {
//     console.error('Update error:', error); // Log the error
//     throw error; // Rethrow the error for handling in the calling function
//   }
// };

// export const deleteStudent = async (id: string | null) => {
//   if (id) {
//     return api.delete(`/student/delete/${id}`);
//   }
// };
