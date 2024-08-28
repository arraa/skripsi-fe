'use client';

import { getStudent } from '@/app/api/student';
import Table from '@/components/common/Table';
import SearchBar from '@/components/common/searchBar';
import { columnData } from '@/components/studentData/column';
import { createStudentProps } from '@/components/studentData/types/types';
import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface StudentDataProps {
  data: createStudentProps[];
}
const StudentData = (StudentDataProps: StudentDataProps) => {
  const { data } = StudentDataProps;
  const [searchValue, setSearchValue] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
  };

  // const filteredData = data.filter(
  //   (item) =>
  //     (selectedClass === "" || item.id_class === selectedClass) &&
  //     (searchValue === "" ||
  //       item.name.toLowerCase().includes(searchValue.toLowerCase()))
  // );

  return (
    <Box sx={{ padding: 3 }}>
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
                className="rounded-md shadow-sm focus:border-[#0C4177] focus:ring focus:ring-[#0C4177] focus:ring-opacity-50"
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
              >
                <option value="" disabled>
                  All Classes
                </option>
                <option value="10A">10A</option>
                <option value="10B">10B</option>
                <option value="10C">10C</option>
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
        <Table data={data} columnData={columnData} searchValue={searchValue} />
      </div>
    </Box>
  );
};

export default StudentData;
