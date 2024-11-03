'use client';

import Table from '@/components/common/Table';

import { Box } from '@mui/material';
import { columnData } from './column';
import { getClass } from '@/app/api/class';
import { useEffect, useState } from 'react';
import { classDataProps } from '../studentData/types/types';
import { Button } from '../common/button/button';
import AddClass from './AddClass';

const ClassGenerator = () => {
  const [classData, setClassData] = useState<classDataProps[]>([]);
  const [NewClass, setNewClass] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number>();
  const handleClassChange = (value: number) => {
    setSelectedClass(value);
  };
  const handleUpdate = (id: string) => {
    console.log(id);
  };

  const columns = columnData(handleUpdate);
  const handleClose = () => {
    setOpen(false);
  };

  function addNextClass(currentClasses: string) {
    const classArray = currentClasses.split(' ');

    const highestClass = classArray.sort().reverse()[0];
    const nextClass = String.fromCharCode(highestClass.charCodeAt(0) + 1);

    return nextClass
  }

  const handleGenerateClass = () => {
    const currentClasses = classData
      .map((classItem) => classItem.name)
      .join(' ');

    const newClassName = addNextClass(currentClasses);
    setNewClass(`${newClassName}`);
    console.log('New class generated:', newClassName);

    setOpen(true);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultClass = await getClass();

        console.log(resultClass);

        setClassData(resultClass);
      } catch (error) {
        console.error('API request error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
      <AddClass
        className={NewClass}
        setOpen={handleClose}
        open={open}
      />
      <div className='mb-2 flex items-center justify-between'>
        <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
          Generate Class
        </h1>
        <div className='flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md'>
          <select
            className='mx-2 w-full bg-transparent px-6 py-3 text-lg'
            value={selectedClass}
            onChange={(e) => handleClassChange(Number(e.target.value))}
          >
            {classData &&
              classData.map((classItem) => (
                <option
                  key={classItem.id}
                  value={classItem.id}
                >
                  Grade&ensp; {classItem.Grade.grade}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* <div className=' h-[80vh] bg-white'> */}
      <div className='flex h-[80vh] flex-col gap-4 rounded-3xl p-5 text-[#0c427770] shadow-md'>
        {/* if you filter not ready you can change data={data} */}
        <Table
          data={classData}
          columnData={columns}
        />
        <div className='flex justify-end'>
          <Button
            onClick={handleGenerateClass}
            size={'default'}
          >
            Generate Class
          </Button>
        </div>
      </div>
      {/* </div> */}
    </Box>
  );
};

export default ClassGenerator;
