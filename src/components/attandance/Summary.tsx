'use client';

import Table from '@/components/common/Table';

import { Box } from '@mui/material';
import { getClass } from '@/app/api/class';
import { useEffect, useState } from 'react';
import { Button } from '../common/button/button';
import Delete from '../common/dialog/Delete';
import { AttandanceProps } from './type/types';
import { classDataProps } from '../classGenerator/types/types';
import { columnData, columnDataSummary } from './column';
import { useRouter } from 'next/navigation';

const AttandanceSummary = () => {
    const attandanceData = [
        {
            'id': 1,
            'name': 'John Doe',
            'hadir': 20,
            'sakit': 2,
            'izin': 3,
            'alfa': 1,
        },
        {
            'id': 2,
            'name': 'Jane Smith',
            'hadir': 18,
            'sakit': 3,
            'izin': 3,
            'alfa': 2,
        },
        {
            'id': 3,
            'name': 'Alice Johnson',
            'hadir': 22,
            'sakit': 1,
            'izin': 3,
            'alfa': 0,
        },
        {
            'id': 4,
            'name': 'Bob Brown',
            'hadir': 19,
            'sakit': 4,
            'izin': 3,
            'alfa': 1,
        },
        {
            'id': 5,
            'name': 'Charlie Davis',
            'hadir': 21,
            'sakit': 2,
            'izin': 3,
            'alfa': 2,
        },
    ];

    const [classData, setClassData] = useState<classDataProps[]>([]);
    const [selectedClass, setSelectedClass] = useState<number>();

    const handleClassChange = (value: number) => {
        setSelectedClass(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultClass = await getClass();

                console.log(resultClass);

                setClassData(resultClass.data.ClassName);
            } catch (error) {
                console.error('API request error', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className='mb-2 flex items-center justify-between'>
                <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
                    Attendance
                </h1>
                <div className='flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md'>
                    <label htmlFor='select-class' className='sr-only'>
                        Select Class
                    </label>
                    <select
                        id='select-class'
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
                <Table data={attandanceData} columnData={columnDataSummary()} />
            </div>
        </Box>
    );
};

export default AttandanceSummary;
