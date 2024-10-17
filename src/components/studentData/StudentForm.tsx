'use client';

import { useEffect, useState } from 'react';
import {
  classDataProps,
  StudentDataProps,
  studentFormPageProps,
} from './types/types';
import * as XLSX from 'xlsx';
import { Button } from '../common/button/button';
import {
  createStudent,
  getStudentById,
  updateStudent,
} from '@/app/api/student';
import { valibotResolver } from '@hookform/resolvers/valibot';
import type { InferInput } from 'valibot';
import { useForm } from 'react-hook-form';
import { ControllerField } from '../common/form/textField';
import { ControllerSelectField } from '../common/form/selectField';
import { minLength, object, pipe, string } from 'valibot';
import { getClass } from '@/app/api/class';
import ImportData from '../common/dialog/ImportData';
import { AxiosResponse } from 'axios';
import { StringDecoder } from 'string_decoder';

type ObjectInput = InferInput<typeof ObjectSchema>;

const ObjectSchema = object({
  // studentID: pipe(string(), minLength(1, 'NISN is required')),
  name: pipe(string(), minLength(1, 'Full Name is required')),
  gender: pipe(string(), minLength(1, 'Gender is required')),
  place_of_birth: pipe(string(), minLength(1, 'Place of Birth is required')),
  date_of_birth: pipe(string(), minLength(1, 'Date of Birth is required')),
  religion: pipe(string(), minLength(1, 'Religion is required')),
  address: pipe(string(), minLength(1, 'Address is required')),
  number_phone: pipe(string(), minLength(1, 'Phone Number is required')),
  email: pipe(string(), minLength(1, 'Email is required')),
  accepted_date: pipe(string(), minLength(1, 'Accepted Date is required')),
  school_origin: pipe(string(), minLength(1, 'School Origin is required')),
  id_class: pipe(string(), minLength(1, 'Class is required')),
  father_name: pipe(string(), minLength(1, 'Father Name is required')),
  father_job: pipe(string(), minLength(1, 'Father Job is required')),
  father_number_phone: pipe(
    string(),
    minLength(1, 'Father Phone Number is required')
  ),
  mother_name: pipe(string(), minLength(1, 'Mother Name is required')),
  mother_job: pipe(string(), minLength(1, 'Mother Job is required')),
  mother_number_phone: pipe(
    string(),
    minLength(1, 'Mother Phone Number is required')
  ),
});

const StudentForm = ({ typePage, id }: studentFormPageProps) => {
  const [data, setData] = useState<StudentDataProps>();
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
      // studentID: '',
      name: '',
      gender: '',
      place_of_birth: '',
      date_of_birth: '',
      religion: '',
      address: '',
      number_phone: '',
      email: '',
      accepted_date: '',
      school_origin: '',
      id_class: '',
      father_name: '',
      father_job: '',
      father_number_phone: '',
      mother_name: '',
      mother_job: '',
      mother_number_phone: '',
    },
  });

  const handleDialog = () => {
    setOpen(!open);
  };

  const fetchData = async () => {
    try {
      if (id) {
        const response = await getStudentById(id);

        setData(response);
      }
    } catch (error) {
      console.error('API request error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  console.log('data class', classData);

  useEffect(() => {
    const fetchDataClass = async () => {
      try {
        const result = await getClass();
        console.log('data class', result);

        setClassData(result);
      } catch (error) {
        console.error('API request error', error);
      }
    };

    fetchDataClass();
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || '',
        gender: data.gender || '',
        place_of_birth: data.place_of_birth || '',
        date_of_birth: data.date_of_birth || '',
        religion: data.religion || '',
        address: data.address || '',
        number_phone: data.number_phone || '',
        email: data.email || '',
        accepted_date: data.accepted_date || '',
        school_origin: data.school_origin || '',
        id_class: data.id_class?.toString() || '',
        father_name: data.father_name || '',
        father_job: data.father_job || '',
        father_number_phone: data.father_number_phone || '',
        mother_name: data.mother_name || '',
        mother_job: data.mother_job || '',
        mother_number_phone: data.mother_number_phone || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: ObjectInput) => {
    console.log(data);

    const newData: StudentDataProps = {
      // studentID: data.studentID,
      name: data.name,
      gender: data.gender,
      place_of_birth: data.place_of_birth,
      date_of_birth: data.date_of_birth,
      religion: data.religion,
      address: data.address,
      number_phone: data.number_phone,
      email: data.email,
      accepted_date: data.accepted_date,
      school_origin: data.school_origin,
      id_class: Number(data.id_class),
      father_name: data.father_name,
      father_job: data.father_job,
      father_number_phone: data.father_number_phone,
      mother_name: data.mother_name,
      mother_job: data.mother_job,
      mother_number_phone: data.mother_number_phone,
    };
    console.log('newData', newData.accepted_date);
    try {
      if (typePage === 'update' && id) {
        console.log('Updating student with ID:', id);
        await updateStudent(id, newData);
      } else if (typePage === 'create') {
        console.log('Creating new student');
        await createStudent(newData);
      }
      alert(
        typePage === 'update'
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

  const formatPhoneNumber = (number : string) => {
    // Assuming the phone number is a string and starts with a country code.
    // Example input: '08234567890', convert it to '+6208234567890' for Indonesia
    if (!number) return '';

  
    // Add country code if not present (e.g., for Indonesia, use +62)
    if (!number.startsWith('62')) {
    console.log('number', `+62${number}`);
      
      return `+62${number}`; // Adjust the country code as necessary
    }
    console.log('number', `+${number}`);
  
    return `+${number}`; // Add the plus sign for E.164 format
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
  
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<any[]>(firstSheet, { header: 1 });
  
      const [, ...studentData] = jsonData; 
      if (studentData.length > 0) {
        console.log('studentData', jsonData);
 
        for (const student of studentData) {
          const [
            name,
            gender,
            place_of_birth,
            date_of_birth,
            religion,
            address,
            number_phone,
            email,
            accepted_date,
            school_origin,
            id_class,
            father_name,
            father_job,
            father_number_phone,
            mother_name,
            mother_job,
            mother_number_phone,
          ] = student.map((value, index) => {
            
            if (index == 3 || index == 8 ) {
              const date = XLSX.SSF.parse_date_code(value);
              return new Date(date.y, date.m - 1, date.d).toISOString().split('T')[0]; 
            }
            return value.toString(); 
          });
   
          const newData = {
            name: name || '',
            gender: gender || '',
            place_of_birth: place_of_birth || '',
            date_of_birth: date_of_birth || '', 
            religion: religion || '',
            address: address || '',
            number_phone:formatPhoneNumber(number_phone),
            email: email || '',
            accepted_date: accepted_date || '',
            school_origin: school_origin || '',
            id_class: id_class?.toString() || '',
            father_name: father_name || '',
            father_job: father_job || '',
            father_number_phone: formatPhoneNumber(father_number_phone),
            mother_name: mother_name || '',
            mother_job: mother_job || '',
            mother_number_phone: formatPhoneNumber(mother_number_phone),
          };

          console.log('newData', newData);
  
          // onSubmit(newData)
        }
      }
    };
  
    reader.readAsBinaryString(file);
  };
  
  return (
    <div className="w-full">
      <ImportData
        setOpen={handleDialog}
        handleImport={handleFileUpload}
        open={open}
      />
      <div className="-mt-20 flex w-full justify-end ">
        <Button onClick={handleDialog}>
          &#43;<span className="hidden pl-3 sm:flex">Import</span>
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-[#353535]">
        <div>
          <h1 className="my-8 text-xl text-[#0C4177]">
            Student’s Personal Data
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          {/* <ControllerField
            control={control}
            name="id"
            label="NISN"
            placeholder="Please input student’s NISN."
            errors={errors.studentID}
            value={data?.studentID}
          /> */}
          <ControllerField
            control={control}
            name="name"
            label="Full Name"
            placeholder="Please input student’s Full Name"
            errors={errors.name}
            value={data?.name}
          />
          <ControllerSelectField
            control={control}
            name="gender"
            label="Gender"
            options={['Male', 'Female'].map((value) => ({ label: value }))}
            placeholder={'Please choose student’s gender.'}
            errors={errors.gender}
            value={data?.gender}
          />
          <ControllerField
            control={control}
            name="place_of_birth"
            label="Place of Birth"
            placeholder="Please input student’s Place of Birth"
            errors={errors.place_of_birth}
            value={data?.place_of_birth}
          />
          <ControllerField
            control={control}
            name="date_of_birth"
            label="Date Of Birth"
            placeholder="Please input student’s Date Of Birth"
            type="date"
            errors={errors.date_of_birth}
            value={data?.date_of_birth}
          />
          <ControllerSelectField
            control={control}
            name="religion"
            label="Religion"
            options={[
              'Islam',
              'Kristen Protestan',
              'Kristen Katolik',
              'Hindu',
              'Buddha',
              'Konghucu',
            ].map((value) => ({ label: value }))}
            placeholder="Please choose student’s Religion."
            errors={errors.religion}
            value={data?.religion}
          />
          <ControllerField
            control={control}
            name="address"
            label="address"
            placeholder="Please input student’s address"
            errors={errors.address}
            value={data?.address}
          />
          <ControllerField
            control={control}
            name="number_phone"
            label="Number Phone"
            placeholder="Please input student’s Number Phone"
            errors={errors.number_phone}
            value={data?.number_phone}
          />

          <ControllerField
            control={control}
            name="email"
            label="Email"
            placeholder="Please input student’s Email"
            errors={errors.email}
            value={data?.email}
          />
          <ControllerField
            control={control}
            name="accepted_date"
            label="Accepted Date"
            placeholder="Please input student’s Accepted Date"
            type="date"
            errors={errors.accepted_date}
            value={data?.accepted_date}
          />
          <ControllerField
            control={control}
            name="school_origin"
            label="School Origin"
            placeholder="Please input student’s School Origin"
            errors={errors.school_origin}
            value={data?.school_origin}
          />
          <ControllerSelectField
            control={control}
            name="id_class"
            label="Class"
            // eslint-disable-next-line quotes
            options={classData.map((item: classDataProps) => ({
              value: item.id,
              label: `${item.grade}${item.name}`,
            }))}
            placeholder="Please choose student’s Class."
            errors={errors.id_class}
            value={data?.id_class}
          />
        </div>
        <h1 className="my-8 text-xl text-[#0C4177]">Student Parents’ Data</h1>
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          <ControllerField
            control={control}
            name="father_name"
            label="Father Name"
            placeholder="Please input Father Name"
            errors={errors.father_name}
            value={data?.father_name}
          />
          <ControllerField
            control={control}
            name="mother_name"
            label="Mother Name"
            placeholder="Please input Mother Name"
            errors={errors.mother_name}
            value={data?.mother_name}
          />
          <ControllerField
            control={control}
            name="father_job"
            label="Father Job"
            placeholder="Please input Father Job"
            errors={errors.father_job}
            value={data?.father_job}
          />
          <ControllerField
            control={control}
            name="mother_job"
            label="Mother Job"
            placeholder="Please input Mother Job"
            errors={errors.mother_job}
            value={data?.mother_job}
          />
          <ControllerField
            control={control}
            name="father_number_phone"
            label="Father Phone Number"
            placeholder="Please input Father Phone Number"
            errors={errors.father_number_phone}
            value={data?.father_number_phone}
          />
          <ControllerField
            control={control}
            name="mother_number_phone"
            label="Mother Phone Number"
            placeholder="Please input Mother Phone Number"
            errors={errors.mother_number_phone}
            value={data?.mother_number_phone}
          />
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
  );
};

export default StudentForm;
