'use client';

import { useEffect, useState } from 'react';
import {
  classDataProps,
  UserDataProps,
  TeacherDataProps,
  studentFormPageProps,
} from './types/types';
import * as XLSX from 'xlsx';
import { Button } from '../common/button/button';
import {
  createStudent,
  createStudentbyExcel,
  getStudentById,
  updateStudent,
} from '@/app/api/student';
import { valibotResolver } from '@hookform/resolvers/valibot';
import type { InferInput } from 'valibot';
import { useForm } from 'react-hook-form';
import { ControllerField } from '../common/form/textField';
import { ControllerSelectField } from '../common/form/selectField';
import { minLength, number, object, pipe, string } from 'valibot';
import { getClass } from '@/app/api/class';
import ImportData from '../common/dialog/ImportData';
import { AxiosResponse } from 'axios';
import { StringDecoder } from 'string_decoder';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { createTeacher } from '@/app/api/teacher';

type ObjectInput = InferInput<typeof ObjectSchema>;

const ObjectSchema = object({
  name: pipe(string(), minLength(1, 'Full Name is required')),
  gender: pipe(string(), minLength(1, 'Gender is required')),
  place_of_birth: pipe(string(), minLength(1, 'Place of Birth is required')),
  date_of_birth: pipe(string(), minLength(1, 'Date of Birth is required')),
  address: pipe(string(), minLength(1, 'Address is required')),
  num_phone: pipe(string(), minLength(1, 'Phone Number is required')),
  email: pipe(string(), minLength(1, 'Email is required')),
  teaching_hour: pipe(string(), minLength(1, 'Email is required')),
});

const TeacherForm = () => {
  const searchParams = useSearchParams();
  const actionType = searchParams.get('action');
  const id = searchParams.get('student');

  const [data, setData] = useState<TeacherDataProps>();
  const [classData, setClassData] = useState<classDataProps[]>([]);
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ObjectInput>({
    resolver: valibotResolver(ObjectSchema),
    defaultValues: {
      name: '',
      gender: '',
      place_of_birth: '',
      date_of_birth: '',
      address: '',
      num_phone: '',
      email: '',
      teaching_hour: '',
    },
  });

  const handleDialog = () => {
    setOpen(!open);
  };

  // const fetchData = async () => {
  //   try {
  //     if (id) {
  //       const response = await getStudentById(id);

  //       setData(response);
  //     }
  //   } catch (error) {
  //     console.error('API request error', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [id]);

  // useEffect(() => {
  //   const fetchDataClass = async () => {
  //     try {
  //       const result = await getClass();

  //       setClassData(result);
  //     } catch (error) {
  //       console.error('API request error', error);
  //     }
  //   };

  //   fetchDataClass();
  // }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.user.name || '',
        gender: data.user.gender || '',
        place_of_birth: data.user.place_of_birth || '',
        date_of_birth: data.user.date_of_birth || '',
        address: data.user.address || '',
        num_phone: data.user.num_phone || '',
        email: data.user.email || '',
        teaching_hour: data.teaching_hour || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: ObjectInput) => {
    console.log(data);

    const userData: UserDataProps = {
        name: data.name || '',
        gender: data.gender || '',
        place_of_birth: data.place_of_birth || '',
        date_of_birth: data.date_of_birth || '',
        address: data.address || '',
        num_phone: data.num_phone || '',
        email: data.email || '',
    };

    const teacherData: TeacherDataProps = {
        teaching_hour: data.teaching_hour || '',
        user: userData,
    };

    try {
      if (actionType === 'update' && id) {
        console.log('Updating student with ID:', id);
        // await updateStudent(id, newData);
      } else if (actionType === 'create') {
        console.log('Creating new teacher');
        await createTeacher(teacherData);
      }
      alert(
        actionType === 'update'
          ? 'Student updated successfully'
          : 'Student created successfully'
      );
    } catch (error) {
      console.error('API request error', error);
    }
    // finally {
    //   setTimeout(() => {
    //     window.location.replace('/personal-data/student');
    //   }, 100);
    // }
  };

  const formatPhoneNumber = (number: string) => {
    if (!number) return '';

    if (!number.startsWith('62')) {
      console.log('number', `+62${number}`);

      return `+62${number}`;
    }
    console.log('number', `+${number}`);

    return `+${number}`;
  };

const formatDate =  (date : number) =>{
  const dateFormated = XLSX.SSF.parse_date_code(date);
  return new Date(dateFormated.y, dateFormated.m - 1, dateFormated.d)
    .toISOString()
    .split('T')[0];
}

  // const handleFileUpload = async (file: File | null) => {
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = async (event) => {
  //     const data = event.target?.result;
  //     const workbook = XLSX.read(data, { type: 'binary' });

  //     const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const jsonData = XLSX.utils.sheet_to_json<any[]>(firstSheet, {
  //       header: 1,
  //     });

  //     const [, ...studentData] = jsonData;
  //     if (studentData.length > 0) {
  //       console.log('studentData', jsonData);
  //       const newDataArray: StudentDataProps[] = [];
  //       for (const student of studentData) {
  //         const [
  //           nisn,
  //           name,
  //           gender,
  //           place_of_birth,
  //           date_of_birth,
  //           religion,
  //           address,
  //           number_phone,
  //           email,
  //           accepted_date,
  //           school_origin,
  //           id_class,
  //           father_name,
  //           father_job,
  //           father_number_phone,
  //           mother_name,
  //           mother_job,
  //           mother_number_phone,
  //         ] = student

  //         const newData = {
  //           nisn: nisn.toString() || '',
  //           name: name || '',
  //           gender: gender || '',
  //           place_of_birth: place_of_birth || '',
  //           date_of_birth:formatDate(date_of_birth) || '',
  //           religion: religion || '',
  //           address: address || '',
  //           number_phone: formatPhoneNumber(number_phone),
  //           email: email || '',
  //           accepted_date: formatDate(accepted_date) || '',
  //           school_origin: school_origin || '',
  //           id_class: Number(id_class) || 0,
  //           father_name: father_name || '',
  //           father_job: father_job || '',
  //           father_number_phone: formatPhoneNumber(father_number_phone),
  //           mother_name: mother_name || '',
  //           mother_job: mother_job || '',
  //           mother_number_phone: formatPhoneNumber(mother_number_phone),
  //         };
  //         newDataArray.push(newData);
  //       }
  //       try {
  //         const respone = await createStudentbyExcel(newDataArray);

  //         console.log('respone', respone);
  //       } catch (error : any) {
  //         console.log('API request error', error.response);
  //         throw error;
  //       }
  //     }
  //   };

  //   reader.readAsBinaryString(file);
  // };

  return (
    <Box sx={{ padding: 3, width: '100%' }}>
      {actionType === 'create' ? (
        <div className="flex items-center">
          <h1 className="my-8 w-full text-3xl font-bold text-[#0C4177]">
            Add New Teacher
          </h1>
          <div className=" flex w-full justify-end ">
            <Button onClick={handleDialog}>
              &#43;<span className="hidden pl-3 sm:flex">Import</span>
            </Button>
          </div>
        </div>
      ) : (
        <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
          Update Teacher
        </h1>
      )}

      <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
        {/* <ImportData
          setOpen={handleDialog}
          handleImport={handleFileUpload}
          open={open}
        /> */}

        <form onSubmit={handleSubmit(onSubmit)} className="text-[#353535]">
          <div>
            <h1 className="my-8 text-xl text-[#0C4177]">
              Teacher’s Personal Data
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            <ControllerField
              control={control}
              name="name"
              label="Full Name"
              placeholder="Please input teacher’s Full Name"
              errors={errors.name}
              value={data?.user.name}
            />
            <ControllerSelectField
              control={control}
              name="gender"
              label="Gender"
              options={['Male', 'Female'].map((value) => ({ label: value }))}
              placeholder={'Please choose teacher’s gender.'}
              errors={errors.gender}
              value={data?.user.gender}
            />
            <ControllerField
              control={control}
              name="place_of_birth"
              label="Place of Birth"
              placeholder="Please input teacher’s Place of Birth"
              errors={errors.place_of_birth}
              value={data?.user.place_of_birth}
            />
            <ControllerField
              control={control}
              name="date_of_birth"
              label="Date Of Birth"
              placeholder="Please input teacher’s Date Of Birth"
              type="date"
              errors={errors.date_of_birth}
              value={data?.user.date_of_birth}
            />
            <ControllerField
              control={control}
              name="address"
              label="address"
              placeholder="Please input teacher’s address"
              errors={errors.address}
              value={data?.user.address}
            />
            <ControllerField
              control={control}
              name="number_phone"
              label="Number Phone"
              placeholder="Please input teacher’s Number Phone"
              errors={errors.num_phone}
              value={data?.user.num_phone}
            />

            <ControllerField
              control={control}
              name="email"
              label="Email"
              placeholder="Please input teacher’s Email"
              errors={errors.email}
              value={data?.user.email}
            />
            {/* <ControllerSelectField
              control={control}
              name="id_class"
              label="Subject"
              // eslint-disable-next-line quotes
              options={classData.map((item: classDataProps) => ({
                value: item.id,
                label: `${item.grade}${item.name}`,
              }))}
              placeholder="Please choose teacher's subject."
              errors={errors.id_class}
              value={data?.id_class}
            /> */}
            {/* <ControllerSelectField
              control={control}
              name="id_class"
              label="Homeroom Teacher"
              // eslint-disable-next-line quotes
              options={classData.map((item: classDataProps) => ({
                value: item.id,
                label: `${item.grade}${item.name}`,
              }))}
              placeholder="Please choose teacher's role"
              errors={errors.id_class}
              value={data?.id_class}
            /> */}
          </div>

          <div className="mb-4 mt-10 flex justify-end">
            <Button
              onSubmit={handleSubmit(onSubmit)}
              type="submit"
              size={'submit'}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default TeacherForm;
