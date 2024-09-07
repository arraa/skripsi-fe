'use client';

import { getClass } from '@/app/api/class';
import { getStudent } from '@/app/api/student';
import Table from '@/components/common/Table';
import SearchBar from '@/components/common/searchBar';
import { columnData } from '@/components/studentData/column';
import {
  classDataProps,
  StudentDataProps,
} from '@/components/studentData/types/types';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const StudentData = () => {
  const [data, setData] = useState<StudentDataProps[]>([]);
  const [classData, setClassData] = useState<classDataProps[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedClass, setSelectedClass] = useState<number>();
  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null); 

  const handleClickOpen = (studentId: number) => {
    setSelectedStudentId(studentId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudentId(null); 
  };

  const handleDelete = () => {
  
    console.log('Deleting student with ID:', selectedStudentId);
    handleClose();
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClassChange = (value: number) => {
    setSelectedClass(value);
  };

  const filteredData = data
  .filter((student) => {
    console.log('selectedClass', student.id_class, selectedClass);
    return !selectedClass || selectedClass === 0 || student.id_class === selectedClass;
  })
  .map((student: StudentDataProps) => {
    const findClass = classData.find(
      (classItem: classDataProps) => classItem.id === student.id_class
    );

    console.log('findClass', findClass);

    if (findClass) {
      return {
        ...student,
        id_class: findClass.grade + ' ' + findClass.name, 
      };
    }

    return student;
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStudent();
        const resultClass = await getClass();

        setClassData(resultClass);
        setData(result);
      } catch (error) {
        console.error('API request error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ color: '#0C4177' }} id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure want to delete student ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <h1 className="my-8 text-3xl font-bold text-[#0C4177]">Personal Data</h1>
      <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-4">
            <SearchBar
              setSearchValue={handleSearchChange}
              SearchName={'Student'}
            />
            <div>
              <select
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
              </select>
            </div>
          </div>

          <Link
            href={'/personal-data/student/create'}
            className="flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md"
          >
            &#43; <span className="hidden pl-3 sm:flex">Add Student</span>
          </Link>
        </div>
        <Table
          data={filteredData}
          columnData={columnData(handleClickOpen)}
          searchValue={searchValue}
        />
      </div>
    </Box>
  );
};

export default StudentData;
