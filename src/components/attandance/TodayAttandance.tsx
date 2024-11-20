'use client';

import Table from '@/components/common/Table';

import { Box } from '@mui/material';
import { getClass } from '@/app/api/class';
import { useEffect, useState } from 'react';
import { Button } from '../common/button/button';
import Delete from '../common/dialog/Delete';
import { AttandanceProps } from './type/types';
import { classDataProps } from '../classGenerator/types/types';
import { columnData } from './column';
import { useRouter } from 'next/navigation';
import { getAttendanceByMonth } from '@/app/api/attendance';

const AttandanceToday = () => {
    const attandanceData = [
        {
            id: 1,
            date: '2024-11-01',
            hadir: 20,
            sakit: 2,
            alfa: 1,
        },
        {
            id: 2,
            date: '2024-11-02',
            hadir: 18,
            sakit: 3,
            alfa: 2,
        },
        {
            id: 3,
            date: '2024-11-03',
            hadir: 22,
            sakit: 1,
            alfa: 0,
        },
        {
            id: 4,
            date: '2024-11-04',
            hadir: 19,
            sakit: 4,
            alfa: 1,
        },
        {
            id: 5,
            date: '2024-11-05',
            hadir: 21,
            sakit: 2,
            alfa: 2,
        },
    ];

    const grade = [7, 8, 9];
    const [classData, setClassData] = useState<classDataProps[]>([]);

    const [attandance, setAttandance] =
        useState<AttandanceProps[]>(attandanceData);
    const [NewClass, setNewClass] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClassChange = (value: number) => {
        setSelectedClass(value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getClass();

                setClassData(result.data.ClassName);
                setSelectedClass(result.data.ClassName[0].id);
            } catch (error) {
                console.error('API request error getClass:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAttendanceByMonth(selectedClass, new Date('2024-08-01'));

                console.log('result data', result);
            } catch (error) {
                console.error('API request error', error);
            }
        }
        if (selectedClass !== 0) {
            fetchData();
        }
    } , [classData, selectedClass]);
    const handleEditAttandance = (id: number) => {
        router.push('/attendance/attendance-form?action=edit&');
    };

    const rows = columnData(handleEditAttandance);
    const router = useRouter();

    const handleAddAttandance = () => {
        router.push('/attendance/attendance-form?action=create');
    };

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            {/* <AddClass
        className={NewClass}
        setOpen={handleClose}
        open={open}
        grade={'7'}
        teacher={teacher}
        teacherName={teacherName}
      />
      <Delete
        setOpen={handleClose}
        name={'Class'}
        onDelete={deletedStudent}
        open={openDelete}
      /> */}
            <div className='mb-2 flex items-center justify-between'>
                <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
                    Attendance
                </h1>
                <div className='flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md'>
                    <select
                        className='mx-2 w-full bg-transparent px-6 py-3 text-lg'
                        value={selectedClass}
                        onChange={(e) =>
                            handleClassChange(Number(e.target.value))
                        }
                    >
                        {classData &&
                            classData.map((classItem) => (
                                <option key={classItem.id} value={classItem.id}>
                                    Class&ensp; {classItem.Grade?.grade}
                                    {classItem.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className='flex h-[80vh] flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                <div className='flex items-center justify-between'>
                    <Button onClick={handleAddAttandance} size={'default'}>
                        add Attandance
                    </Button>

                    <div className='flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md'>
                        <select
                            className='mx-2  bg-transparent px-6 py-2 text-lg'
                            value={selectedClass}
                            onChange={(e) =>
                                handleClassChange(Number(e.target.value))
                            }
                        >
                            {classData &&
                                classData.map((classItem) => (
                                    <option
                                        key={classItem.id}
                                        value={classItem.id}
                                    >
                                        Grade&ensp; {classItem.Grade?.grade}
                                        {classItem.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <Table data={attandance} columnData={rows} />
            </div>
        </Box>
    );
};

export default AttandanceToday;
