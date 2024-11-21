'use client';

import Table from '@/components/common/Table';

import { Box } from '@mui/material';
import { deleteClass, getClass } from '@/app/api/class';
import { useEffect, useState } from 'react';
import { Button } from '../common/button/button';
import Delete from '../common/dialog/Delete';
import {
    AttandanceFormProps,
    AttandanceProps,
    AttendanceFormData,
} from './type/types';
import { classDataProps } from '../classGenerator/types/types';
import { columnData, columnDataAttandanceForm } from './column';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { array, InferInput, minLength, object, pipe, string } from 'valibot';
import { ControllerSelectField } from '../common/form/selectField';

const ObjectSchema = array(
    object({
        reason: string(),
    })
);

type ObjectInput = InferInput<typeof ObjectSchema>;

const AttandanceForm = () => {
    const initialAttendanceData = [
        {
            id: 1,
            student_id: '1',
            name: 'John Doe',
            sex: 'Male',
            reason: '',
            date: new Date(),
        },
        {
            id: 2,
            student_id: '2',
            name: 'Jane Smith',
            sex: 'Female',
            reason: '',
            date: new Date(),
        },
        {
            id: 3,
            student_id: '3',
            name: 'Alice Johnson',
            sex: 'Female',
            reason: '',
            date: new Date(),
        },
        {
            id: 4,
            student_id: '4',
            name: 'Bob Brown',
            sex: 'Male',
            reason: '',
            date: new Date(),
        },
        {
            id: 5,
            student_id: '5',
            name: 'Charlie Davis',
            sex: 'Male',
            reason: '',
            date: new Date(),
        },
    ];

    const searchParams = useSearchParams();
    const actionType = searchParams.get('action');
    const id = searchParams.get('student');
    const status = ['Hadir', 'Sakit', 'Izin', 'Alfa'];
    const [classData, setClassData] = useState<classDataProps[]>([]);

    const [attandance, setAttandance] = useState<AttandanceFormProps[]>(
        initialAttendanceData
    );
    const [reason, setreason] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<number>();
    const [openDelete, setOpenDelete] = useState(false);

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const dateObj = new Date();
        const formatted = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long', // 'long' gives the full name of the day (e.g., 'Monday')
            day: 'numeric', // 'numeric' gives the day of the month (e.g., '17')
            month: 'long', // 'long' gives the full month name (e.g., 'June')
            year: 'numeric', // 'numeric' gives the full year (e.g., '2024')
        });
        setFormattedDate(formatted);
    }, []);

    // function generateSchema(data: AttandanceFormProps[]) {
    //   const reasonSchema = data.reduce((acc, entry) => {
    //     acc[`reason-${entry.id}`] = pipe(string(), minLength(1, 'Reason is required'));
    //     return acc;
    //   }, {});

    //   return object(reasonSchema);
    // }

    const { handleSubmit, control, setValue, reset } =
        useForm<AttendanceFormData>({
            defaultValues: {}, // defaultValues will be updated by `reset`
        });

    useEffect(() => {
        const transformedData = attandance.reduce<AttendanceFormData>(
            (acc, entry) => {
                acc[`reason-${entry.id}`] = { reason: entry.reason || 'Hadir' };
                return acc;
            },
            {}
        );

        reset(transformedData);
    }, [attandance, reset]);

    const onSubmit = (data: AttendanceFormData) => {
        console.log(data);

        const submittedData = attandance.map((student) => {
            const reasonKey = `reason-${student.id}`;
            const reason = data[reasonKey].reason || data[reasonKey];

            console.log(reason, 'reason key', reasonKey);

            return {
                name: student.student_id,
                reason: reason,
            };
        });

        console.log('Submitted data:', submittedData);
    };

    const handleClassChange = (value: number) => {
        setSelectedClass(value);
    };

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const resultClass = await getClass();

    //       console.log(resultClass);

    //       setClassData(resultClass);
    //     } catch (error) {
    //       console.error('API request error', error);
    //     }
    //   };
    //   fetchData();
    // }, []);

    // const handleUpdate = (id: number, reason: string) => {
    //   setAttandance((prevData: any[]) =>
    //     prevData.map((row: { id: number; }) =>
    //       row.id === id ? { ...row, reason } : row
    //     )
    //   );
    // };

    const rows = columnDataAttandanceForm(
        status,
        control,
        setValue,
        attandance
    );

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className='mb-2 flex items-center justify-between'>
                <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
                    Attandance Class
                </h1>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className='flex h-[80vh] flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-[#353535]'
                >
                    <div className='mb-4 mt-10 ml-3 flex justify-start text-xl font-bold text-[#0c42777a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  '>
                        {formattedDate}
                    </div>

                    <Table data={attandance} columnData={rows} heighRow={75} />

                    <div className='mb-4 flex justify-end'>
                        <Button
                            onSubmit={handleSubmit(onSubmit)}
                            type='submit'
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

export default AttandanceForm;
