'use client';

import Table from '@/components/common/Table';

import { Box } from '@mui/material';
import { columnData } from './column';
import { deleteClass, getClass } from '@/app/api/class';
import { useEffect, useState } from 'react';
import { Button } from '../common/button/button';
import AddClass from './AddClass';
import { classDataProps, teacher } from './types/types';
import Delete from '../common/dialog/Delete';

const ClassGenerator = () => {
  const teacher = [
    {
      Teacher: {
        TeacherID: 1,
        id_user: 1,
        teaching_hour: 25,
        ClassNames: null,
        User: {
          id: 1,
          name: 'guru1',
          gender: 'Male',
          place_of_birth: 'Bandung',
          date_of_birth: '1990-03-15T08:30:00.000Z',
          address: 'Jl. Merdeka',
          num_phone: '08123456789',
          email: 'guru1@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 2,
        id_user: 2,
        teaching_hour: 20,
        ClassNames: null,
        User: {
          id: 2,
          name: 'guru2',
          gender: 'Female',
          place_of_birth: 'Jakarta',
          date_of_birth: '1988-05-22T10:15:00.000Z',
          address: 'Jl. Raya Bogor',
          num_phone: '08123456798',
          email: 'guru2@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 3,
        id_user: 3,
        teaching_hour: 18,
        ClassNames: null,
        User: {
          id: 3,
          name: 'guru3',
          gender: 'Male',
          place_of_birth: 'Surabaya',
          date_of_birth: '1992-11-01T07:00:00.000Z',
          address: 'Jl. Diponegoro',
          num_phone: '08123456777',
          email: 'guru3@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 4,
        id_user: 4,
        teaching_hour: 22,
        ClassNames: null,
        User: {
          id: 4,
          name: 'guru4',
          gender: 'Female',
          place_of_birth: 'Yogyakarta',
          date_of_birth: '1987-02-19T09:30:00.000Z',
          address: 'Jl. Malioboro',
          num_phone: '08123456766',
          email: 'guru4@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 5,
        id_user: 5,
        teaching_hour: 19,
        ClassNames: null,
        User: {
          id: 5,
          name: 'guru5',
          gender: 'Male',
          place_of_birth: 'Medan',
          date_of_birth: '1989-08-08T08:15:00.000Z',
          address: 'Jl. Sudirman',
          num_phone: '08123456755',
          email: 'guru5@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 6,
        id_user: 6,
        teaching_hour: 24,
        ClassNames: null,
        User: {
          id: 6,
          name: 'guru6',
          gender: 'Female',
          place_of_birth: 'Malang',
          date_of_birth: '1993-09-29T07:45:00.000Z',
          address: 'Jl. Kawi',
          num_phone: '08123456744',
          email: 'guru6@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 7,
        id_user: 7,
        teaching_hour: 15,
        ClassNames: null,
        User: {
          id: 7,
          name: 'guru7',
          gender: 'Male',
          place_of_birth: 'Semarang',
          date_of_birth: '1991-06-17T06:15:00.000Z',
          address: 'Jl. Pandanaran',
          num_phone: '08123456733',
          email: 'guru7@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 8,
        id_user: 8,
        teaching_hour: 21,
        ClassNames: null,
        User: {
          id: 8,
          name: 'guru8',
          gender: 'Female',
          place_of_birth: 'Bali',
          date_of_birth: '1994-12-25T10:00:00.000Z',
          address: 'Jl. Legian',
          num_phone: '08123456722',
          email: 'guru8@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 9,
        id_user: 9,
        teaching_hour: 20,
        ClassNames: null,
        User: {
          id: 9,
          name: 'guru9',
          gender: 'Male',
          place_of_birth: 'Makassar',
          date_of_birth: '1995-07-15T12:30:00.000Z',
          address: 'Jl. Pettarani',
          num_phone: '08123456711',
          email: 'guru9@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 10,
        id_user: 10,
        teaching_hour: 17,
        ClassNames: null,
        User: {
          id: 10,
          name: 'guru10',
          gender: 'Female',
          place_of_birth: 'Padang',
          date_of_birth: '1990-10-02T08:45:00.000Z',
          address: 'Jl. Ahmad Yani',
          num_phone: '08123456700',
          email: 'guru10@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 11,
        id_user: 11,
        teaching_hour: 23,
        ClassNames: null,
        User: {
          id: 11,
          name: 'guru11',
          gender: 'Male',
          place_of_birth: 'Palembang',
          date_of_birth: '1991-04-28T09:15:00.000Z',
          address: 'Jl. Soekarno Hatta',
          num_phone: '08123456699',
          email: 'guru11@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 12,
        id_user: 12,
        teaching_hour: 20,
        ClassNames: null,
        User: {
          id: 12,
          name: 'guru12',
          gender: 'Female',
          place_of_birth: 'Pontianak',
          date_of_birth: '1987-01-30T07:15:00.000Z',
          address: 'Jl. Gajah Mada',
          num_phone: '08123456688',
          email: 'guru12@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 13,
        id_user: 13,
        teaching_hour: 22,
        ClassNames: null,
        User: {
          id: 13,
          name: 'guru13',
          gender: 'Male',
          place_of_birth: 'Balikpapan',
          date_of_birth: '1992-09-09T06:45:00.000Z',
          address: 'Jl. MT Haryono',
          num_phone: '08123456677',
          email: 'guru13@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 14,
        id_user: 14,
        teaching_hour: 24,
        ClassNames: null,
        User: {
          id: 14,
          name: 'guru14',
          gender: 'Female',
          place_of_birth: 'Banjarmasin',
          date_of_birth: '1988-12-01T10:15:00.000Z',
          address: 'Jl. A Yani',
          num_phone: '08123456666',
          email: 'guru14@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 15,
        id_user: 15,
        teaching_hour: 19,
        ClassNames: null,
        User: {
          id: 15,
          name: 'guru15',
          gender: 'Male',
          place_of_birth: 'Aceh',
          date_of_birth: '1989-11-12T08:00:00.000Z',
          address: 'Jl. Teuku Umar',
          num_phone: '08123456655',
          email: 'guru15@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 16,
        id_user: 16,
        teaching_hour: 16,
        ClassNames: null,
        User: {
          id: 16,
          name: 'guru16',
          gender: 'Female',
          place_of_birth: 'Solo',
          date_of_birth: '1993-07-23T11:00:00.000Z',
          address: 'Jl. Slamet Riyadi',
          num_phone: '08123456644',
          email: 'guru16@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 17,
        id_user: 17,
        teaching_hour: 18,
        ClassNames: null,
        User: {
          id: 17,
          name: 'guru17',
          gender: 'Male',
          place_of_birth: 'Lampung',
          date_of_birth: '1990-05-17T07:30:00.000Z',
          address: 'Jl. Pahlawan',
          num_phone: '08123456633',
          email: 'guru17@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 18,
        id_user: 18,
        teaching_hour: 20,
        ClassNames: null,
        User: {
          id: 18,
          name: 'guru18',
          gender: 'Female',
          place_of_birth: 'Kendari',
          date_of_birth: '1988-10-10T06:00:00.000Z',
          address: 'Jl. Sultan Hasanuddin',
          num_phone: '08123456622',
          email: 'guru18@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 19,
        id_user: 19,
        teaching_hour: 23,
        ClassNames: null,
        User: {
          id: 19,
          name: 'guru19',
          gender: 'Male',
          place_of_birth: 'Tasikmalaya',
          date_of_birth: '1991-08-18T08:45:00.000Z',
          address: 'Jl. Tentara Pelajar',
          num_phone: '08123456611',
          email: 'guru19@gmail.com',
        },
      },
    },
    {
      Teacher: {
        TeacherID: 20,
        id_user: 20,
        teaching_hour: 22,
        ClassNames: null,
        User: {
          id: 20,
          name: 'guru20',
          gender: 'Female',
          place_of_birth: 'Manado',
          date_of_birth: '1990-04-02T09:00:00.000Z',
          address: 'Jl. Sam Ratulangi',
          num_phone: '08123456600',
          email: 'guru20@gmail.com',
        },
      },
    },
  ];

  const [classData, setClassData] = useState<classDataProps[]>([]);
  const [NewClass, setNewClass] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number>();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(
    null
  );
  const [teacherName, setTeacherName] = useState<teacher>({} as teacher);
  const handleClassChange = (value: number) => {
    setSelectedClass(value);
  };
  const handleUpdate = (id: number) => {
    
    setOpen(true);
    const classId = classData.find((item) => item.id === id);
    const teacherData = teacher.find((item) => item.Teacher.TeacherID === classId?.id_teacher);


    if(teacherData){
    setTeacherName(teacherData as teacher);

    }
    setNewClass(classId?.name as string);

    console.log('handleClickOpen clicked', classId);
  };

  const handleClickOpen = (classId: number) => {
    setSelectedClassId(classId.toString());
    setOpenDelete(true);
  };

  const columns = columnData(handleClickOpen,handleUpdate);

  const rows = classData.map((row, index) => ({
    ...row,
    isLastRow: index === classData.length - 1, // Set true for the last row
  }));

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setTeacherName({} as teacher);
  };

  function addNextClass(currentClasses: string) {
    const classArray = currentClasses.split(' ');

    const highestClass = classArray.sort().reverse()[0];
    const nextClass = String.fromCharCode(highestClass.charCodeAt(0) + 1);

    return nextClass;
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


  const deletedStudent = async () => {
    console.log('deletedStudent clicked', selectedClassId);
    if (selectedClassId) {
      try {
        const deleted = await deleteClass(selectedClassId);
        setSelectedClassId('');
        console.log('deleted student', deleted);
        return deleted;
      } catch (error) {
        console.error('API request error', error);
      }
    }
  };

  return (
    <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
      <AddClass
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
                  Grade&ensp; {classItem.Grade?.grade}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* <div className=' h-[80vh] bg-white'> */}
      <div className='flex h-[80vh] flex-col gap-4 rounded-3xl p-5 text-[#0c427770] shadow-md'>
        {/* if you filter not ready you can change data={data} */}
        <div className='flex justify-end'>
          <Button
            onClick={handleGenerateClass}
            size={'default'}
          >
            Add Class
          </Button>
        </div>
        <Table
          data={rows}
          columnData={columns}
        />
        <div className='flex justify-end'>
          <Button size={'default'}>Generate Class</Button>
        </div>
      </div>
      {/* </div> */}
    </Box>
  );
};

export default ClassGenerator;
