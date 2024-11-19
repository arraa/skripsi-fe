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
    createTeacher,
    // createTeacherbyExcel,
    getTeacherById,
    // updateTeacher,
} from '@/app/api/teacher';
import { valibotResolver } from '@hookform/resolvers/valibot';
import type { InferInput } from 'valibot';
import { useForm } from 'react-hook-form';
import { ControllerField } from '../common/form/textField';
import { ControllerSelectField } from '../common/form/selectField';
import { minLength, number, object, pipe, string } from 'valibot';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';

type ObjectInput = InferInput<typeof ObjectSchema>;

const ObjectSchema = object({
    name: pipe(string(), minLength(1, 'Full Name is required')),
    gender: pipe(string(), minLength(1, 'Gender is required')),
    place_of_birth: pipe(string(), minLength(1, 'Place of Birth is required')),
    date_of_birth: pipe(string(), minLength(1, 'Date of Birth is required')),
    religion: pipe(string(), minLength(1, 'Religion is required')),
    address: pipe(string(), minLength(1, 'Address is required')),
    num_phone: pipe(string(), minLength(1, 'Phone Number is required')),
    email: pipe(string(), minLength(1, 'Email is required')),
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
            religion: '',
            address: '',
            num_phone: '',
            email: '',
        },
    });

    const handleDialog = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (data) {
            reset({
                name: data.user.name || '',
                gender: data.user.gender || '',
                place_of_birth: data.user.place_of_birth || '',
                date_of_birth: data.user.date_of_birth || '',
                religion: data.user.religion || '',
                address: data.user.address || '',
                num_phone: data.user.num_phone || '',
                email: data.user.email || '',
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
            religion: data.religion || '',
            address: data.address || '',
            num_phone: data.num_phone || '',
            email: data.email || '',
        };

        const teacherData: TeacherDataProps = {
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

    const formatDate = (date: number) => {
        const dateFormated = XLSX.SSF.parse_date_code(date);
        return new Date(dateFormated.y, dateFormated.m - 1, dateFormated.d)
            .toISOString()
            .split('T')[0];
    };

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            {actionType === 'create' ? (
                <div className='flex items-center'>
                    <h1 className='my-8 w-full text-3xl font-bold text-[#0C4177]'>
                        Add New Teacher
                    </h1>
                    <div className=' flex w-full justify-end '>
                        <Button onClick={handleDialog}>
                            &#43;
                            <span className='hidden pl-3 sm:flex'>Import</span>
                        </Button>
                    </div>
                </div>
            ) : (
                <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
                    Update Teacher
                </h1>
            )}

            <div className='min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                {/* <ImportData
          setOpen={handleDialog}
          handleImport={handleFileUpload}
          open={open}
        /> */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-[#353535]'
                >
                    <div>
                        <h1 className='my-8 text-xl text-[#0C4177]'>
                            Teacher’s Personal Data
                        </h1>
                    </div>
                    <div className='grid grid-cols-2 gap-x-16 gap-y-6'>
                        <ControllerField
                            control={control}
                            name='name'
                            label='Full Name'
                            placeholder='Please input teacher’s Full Name'
                            errors={errors.name}
                            value={data?.user.name}
                        />
                        <ControllerSelectField
                            control={control}
                            name='gender'
                            label='Gender'
                            options={['Male', 'Female'].map((value) => ({
                                label: value,
                            }))}
                            placeholder={'Please choose teacher’s gender.'}
                            errors={errors.gender}
                            value={data?.user.gender}
                        />
                        <ControllerField
                            control={control}
                            name='place_of_birth'
                            label='Place of Birth'
                            placeholder='Please input teacher’s Place of Birth'
                            errors={errors.place_of_birth}
                            value={data?.user.place_of_birth}
                        />
                        <ControllerField
                            control={control}
                            name='date_of_birth'
                            label='Date Of Birth'
                            placeholder='Please input teacher’s Date Of Birth'
                            type='date'
                            errors={errors.date_of_birth}
                            value={data?.user.date_of_birth}
                        />
                        <ControllerSelectField
                            control={control}
                            name='religion'
                            label='Religion'
                            options={[
                                'Islam',
                                'Kristen Protestan',
                                'Kristen Katolik',
                                'Hindu',
                                'Buddha',
                                'Konghucu',
                            ].map((value) => ({ label: value }))}
                            placeholder='Please choose student’s Religion.'
                            errors={errors.religion}
                            value={data?.user.religion}
                        />
                        <ControllerField
                            control={control}
                            name='address'
                            label='Address'
                            placeholder='Please input teacher’s address'
                            errors={errors.address}
                            value={data?.user.address}
                        />
                        <ControllerField
                            control={control}
                            name='num_phone'
                            label='Number Phone'
                            placeholder='Please input teacher’s Number Phone'
                            errors={errors.num_phone}
                            value={data?.user.num_phone}
                        />

                        <ControllerField
                            control={control}
                            name='email'
                            label='Email'
                            placeholder='Please input teacher’s Email'
                            errors={errors.email}
                            value={data?.user.email}
                        />
                    </div>

                    <div className='mb-4 mt-10 flex justify-end'>
                        <Button type='submit' size={'submit'}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    );
};

export default TeacherForm;
