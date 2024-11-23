'use client';

import Table from '@/components/common/Table';
import SearchBar from '@/components/common/searchBar';
import { columnData } from '@/components/teacherData/column';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Delete from '../common/dialog/Delete';
import { useRouter } from 'next/navigation';
import { TeacherDataProps } from './types/types';
import { deleteTeacher, getTeacher } from '@/app/api/teacher';

const TeacherData = () => {
    const [data, setData] = useState<TeacherDataProps[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedClass, setSelectedClass] = useState<number>();
    const [open, setOpen] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
        null
    );
    const router = useRouter();

    const handleClickOpen = (studentId: number) => {
        setSelectedTeacherId(studentId.toString());
        console.log('handleClickOpen clicked', studentId);
        setOpen(true);
    };

    const handleAddStudent = () => {
        router.push('/personal-data/teacher/teacher-form?action=create');
    };

    const handleUpdate = (id: string) => {
        router.push(
            `/personal-data/teacher/teacher-form?action=update&teacher=${id}`
        );
    };

    const columns = columnData(handleClickOpen, handleUpdate);

    const handleClose = () => {
        setOpen(false);
        setSelectedTeacherId(null);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleClassChange = (value: number) => {
        setSelectedClass(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTeacher();

                const rowsWithId = result.data.teachers.map((row: any) => ({
                    ...row,
                    id: row.TeacherID,
                }));
                console.log('rowsWithId', rowsWithId);
                setData(rowsWithId);
            } catch (error) {
                console.error('API request error', error);
            }
        };
        fetchData();
    }, []);

    const deletedTeacher = async () => {
        console.log('deletedTeacher clicked', selectedTeacherId);
        if (selectedTeacherId) {
            try {
                const deleted = await deleteTeacher(selectedTeacherId);
                setSelectedTeacherId(null);
                return deleted;
            } catch (error) {
                console.error('API request error', error);
            }
        }
    };

    return (
        <Box sx={{ padding: 3, width: '87vw' }}>
            <Delete
                setOpen={handleClose}
                name={'Student'}
                onDelete={deletedTeacher}
                open={open}
            />
            <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
                Teacher Personal Data
            </h1>
            <div className='min-h-screen   rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                <div className='mb-2 flex items-center justify-between'>
                    <div className='flex gap-4'>
                        <SearchBar
                            setSearchValue={handleSearchChange}
                            SearchName={'Student'}
                        />
                        <div>
                            {/* <select
                className="rounded-md shadow-sm focus:border-[#0C4177] focus:ring focus:ring-[#0C4177]/50"
                value={selectedClass}
                onChange={(e) => handleClassChange(Number(e.target.value))}
              >
                <option value={0}>All Classes</option>
                {classData.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.grade} {classItem.name}
                  </option>
                ))}
              </select> */}
                        </div>
                    </div>

                    <div
                        onClick={handleAddStudent}
                        className='flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md'
                    >
                        &#43;{' '}
                        <span className='hidden pl-3 sm:flex'>Add Teacher</span>
                    </div>
                </div>
                <Table
                    data={data}
                    columnData={columns}
                    searchValue={searchValue}
                />
            </div>
        </Box>
    );
};

export default TeacherData;
