'use server';
import { StudentDataProps } from '@/components/studentData/types/types';
import { api } from './axios';

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

export const getStudent = async () => {
  try {
    const response = await api.get('api/v1/student/');
    const data = formatStudentData(response.data.students);
    return data;
  } catch (error) {
    console.error('API request error', error);
    throw error;
  }
};

export const getStudentById = async (id: string) => {
  try {
    const response = await api.get(`api/v1/student/${id}`);
    const data = formatStudentData(response.data.student);
    return data;
  } catch (error) {
    console.error('API request error', error);
    throw error;
  }
};

export const createStudent = async (props: StudentDataProps) => {
  const {
    id,
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
    id,
    name,
    gender,
    id_class,
    place_of_birth,
    date_of_birth,
    religion,
    address,
    number_phone : number_phone.toString(),
    email,
    accepted_date,
    school_origin,
    father_name,
    father_job,
    father_number_phone : father_number_phone.toString(),
    mother_name,
    mother_job,
    mother_number_phone : mother_number_phone.toString(),
  };
  return api.post('api/v1/student/create', data);
};

export const updateStudent = async (
  getid: string,
  props: StudentDataProps
) => {
  const {
    id,
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
    number_phone : number_phone.toString(),
    email,
    accepted_date,
    school_origin,
    father_name,
    father_job,
    father_number_phone : father_number_phone.toString(),
    mother_name,
    mother_job,
    mother_number_phone : mother_number_phone.toString(),
  };

  
  return api.put(`api/v1/student/update/${getid}`, data);
};

export const deleteStudent = async (id: number) => {
  return api.delete(`api/v1/delete/${id}`);
};
