'use client';

import { getClass } from '@/app/api/class';
import { deleteStudent } from '@/app/api/student';
import Table from '@/components/common/Table';
import SearchBar from '@/components/common/searchBar';
import { columnData } from '@/components/studentData/column';
import {
  StudentDataProps,
} from '@/components/studentData/types/types';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Delete from '../common/dialog/Delete';
import { useRouter } from 'next/navigation';
import { getStudent } from '@/app/api/student';
import { formatStudentData } from '@/lib/formatData';
import { classDataProps } from '../classGenerator/types/types';

const StudentData = () => {
  const [data, setData] = useState<StudentDataProps[]>([]);
  const [classData, setClassData] = useState<classDataProps[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedClass, setSelectedClass] = useState<number>();
  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const handleClickOpen = (studentId: number) => {
    setSelectedStudentId(studentId.toString());
    console.log('handleClickOpen clicked', studentId);
    setOpen(true);
  };

  const handleAddStudent = () => {
    router.push('/personal-data/student/student-form?action=create');
  };

  const handleUpdate = (id: string) => {
    router.push(
      `/personal-data/student/student-form?action=update&student=${id}`
    );
  };

  const columns = columnData(handleClickOpen, handleUpdate);

  const handleClose = () => {
    setOpen(false);
    setSelectedStudentId(null);
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
        const result = await getStudent();

        const data = formatStudentData(result.data.students);
        setData(data);
      } catch (error: any) {
        console.error('API request error', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data
    ? data
        .filter((student) => {
          return (
            !selectedClass ||
            selectedClass === 0 ||
            student.id_class === selectedClass
          );
        })
        .map((student: StudentDataProps, index) => {
          const findClass = classData.find(
            (classItem: classDataProps) => classItem.id === student.id_class
          );

          if (findClass) {
            return {
              ...student,
              id: index,
              id_class: findClass.Grade?.grade + ' ' + findClass.name,
            };
          }

          return {
            ...student,
            id: index,
          };
        })
    : [];

  const deletedStudent = async () => {
    console.log('deletedStudent clicked', selectedStudentId);
    if (selectedStudentId) {
      try {
        const deleted = await deleteStudent(selectedStudentId);
        setSelectedStudentId(null);
        console.log('deleted student', selectedStudentId);
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
        onDelete={deletedStudent}
        open={open}
      />
      <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>Personal Data</h1>
      <div className='min-h-screen   rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
        <div className='mb-2 flex items-center justify-between'>
          <div className='flex gap-4'>
            <SearchBar
              setSearchValue={handleSearchChange}
              SearchName={'Student'}
            />
            <div>
              <select
                className='rounded-md shadow-sm focus:border-[#0C4177] focus:ring focus:ring-[#0C4177]/50'
                value={selectedClass}
                onChange={(e) => handleClassChange(Number(e.target.value))}
              >
                <option value={0}>All Classes</option>
                {classData.map((classItem) => (
                  <option
                    key={classItem.id}
                    value={classItem.id}
                  >
                    {classItem.Grade?.grade} {classItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            onClick={handleAddStudent}
            className='flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md'
          >
            &#43; <span className='hidden pl-3 sm:flex'>Add Student</span>
          </div>
        </div>
        <div className='flex h-full items-center justify-between'>
          <Table
            data={filteredData}
            columnData={columns}
            searchValue={searchValue}
          />
        </div>
      </div>
    </Box>
  );
};

export default StudentData;
