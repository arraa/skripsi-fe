'use client';

import Table from '@/components/common/Table';

import { Box } from '@mui/material';
import { deleteClass, getClass } from '@/app/api/class';
import { useEffect, useState } from 'react';
import { Button } from '../common/button/button';
import { StudentScoringPerSubject } from './types/types';
import Delete from '../common/dialog/Delete';
import { columnData, columnDataSummary } from './column';
import { classDataProps } from '../studentData/types/types';

const ScoringSummary = () => {
    const studentScorings: StudentScoringPerSubject[] = [
        {
            id: 1,
            StudentID: 1,
            ScoringID: 101,
            StudentName: 'Alice Johnson',
            Scoring: [
                // Math
                { SubjectID: 201, AssignmentID: 301, TeacherID: 401, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 85 },
                { SubjectID: 202, AssignmentID: 302, TeacherID: 401, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 90 },
                // Science
                { SubjectID: 301, AssignmentID: 401, TeacherID: 501, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 88 },
                { SubjectID: 302, AssignmentID: 402, TeacherID: 501, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 92 },
                // English
                { SubjectID: 401, AssignmentID: 501, TeacherID: 601, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 83 },
                { SubjectID: 402, AssignmentID: 502, TeacherID: 601, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 87 },
            ],
        },
        {
            id: 2,
            StudentID: 2,
            ScoringID: 102,
            StudentName: 'Bob Smith',
            Scoring: [
                // Math
                { SubjectID: 203, AssignmentID: 303, TeacherID: 402, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 88 },
                { SubjectID: 204, AssignmentID: 304, TeacherID: 402, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 92 },
                // Science
                { SubjectID: 303, AssignmentID: 403, TeacherID: 502, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 84 },
                { SubjectID: 304, AssignmentID: 404, TeacherID: 502, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 86 },
                // English
                { SubjectID: 403, AssignmentID: 503, TeacherID: 602, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 80 },
                { SubjectID: 404, AssignmentID: 504, TeacherID: 602, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 83 },
            ],
        },
        {
            id: 3,
            StudentID: 3,
            ScoringID: 103,
            StudentName: 'Charlie Davis',
            Scoring: [
                // Math
                { SubjectID: 205, AssignmentID: 305, TeacherID: 403, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 79 },
                { SubjectID: 206, AssignmentID: 306, TeacherID: 403, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 85 },
                // Science
                { SubjectID: 305, AssignmentID: 405, TeacherID: 503, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 82 },
                { SubjectID: 306, AssignmentID: 406, TeacherID: 503, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 88 },
                // English
                { SubjectID: 405, AssignmentID: 505, TeacherID: 603, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 80 },
                { SubjectID: 406, AssignmentID: 506, TeacherID: 603, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 84 },
            ],
        },
        {
            id: 4,
            StudentID: 4,
            ScoringID: 104,
            StudentName: 'Diana Miller',
            Scoring: [
                // Math
                { SubjectID: 207, AssignmentID: 307, TeacherID: 404, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 94 },
                { SubjectID: 208, AssignmentID: 308, TeacherID: 404, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 89 },
                // Science
                { SubjectID: 307, AssignmentID: 407, TeacherID: 504, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 91 },
                { SubjectID: 308, AssignmentID: 408, TeacherID: 504, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 87 },
                // English
                { SubjectID: 407, AssignmentID: 507, TeacherID: 604, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 88 },
                { SubjectID: 408, AssignmentID: 508, TeacherID: 604, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 85 },
            ],
        },
        {
            id: 5,
            StudentID: 5,
            ScoringID: 105,
            StudentName: 'Ethan Brown',
            Scoring: [
                // Math
                { SubjectID: 209, AssignmentID: 309, TeacherID: 405, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 81 },
                { SubjectID: 210, AssignmentID: 310, TeacherID: 405, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 78 },
                // Science
                { SubjectID: 309, AssignmentID: 409, TeacherID: 505, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 85 },
                { SubjectID: 310, AssignmentID: 410, TeacherID: 505, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 83 },
                // English
                { SubjectID: 409, AssignmentID: 509, TeacherID: 605, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 80 },
                { SubjectID: 410, AssignmentID: 510, TeacherID: 605, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 81 },
            ],
        },
        {
            id: 6,
            StudentID: 6,
            ScoringID: 106,
            StudentName: 'Fiona Williams',
            Scoring: [
                // Math
                { SubjectID: 211, AssignmentID: 311, TeacherID: 406, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 90 },
                { SubjectID: 212, AssignmentID: 312, TeacherID: 406, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 87 },
                // Science
                { SubjectID: 311, AssignmentID: 411, TeacherID: 506, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 88 },
                { SubjectID: 312, AssignmentID: 412, TeacherID: 506, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 85 },
                // English
                { SubjectID: 411, AssignmentID: 511, TeacherID: 606, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 84 },
                { SubjectID: 412, AssignmentID: 512, TeacherID: 606, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 81 },
            ],
        },
        {
            id: 7,
            StudentID: 7,
            ScoringID: 107,
            StudentName: 'George Martinez',
            Scoring: [
                // Math
                { SubjectID: 213, AssignmentID: 313, TeacherID: 407, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 95 },
                { SubjectID: 214, AssignmentID: 314, TeacherID: 407, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 88 },
                // Science
                { SubjectID: 313, AssignmentID: 413, TeacherID: 507, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 92 },
                { SubjectID: 314, AssignmentID: 414, TeacherID: 507, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 90 },
                // English
                { SubjectID: 413, AssignmentID: 513, TeacherID: 607, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 86 },
                { SubjectID: 414, AssignmentID: 514, TeacherID: 607, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 83 },
            ],
        },
        {
            id: 8,
            StudentID: 8,
            ScoringID: 108,
            StudentName: 'Hannah Lee',
            Scoring: [
                // Math
                { SubjectID: 215, AssignmentID: 315, TeacherID: 408, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 82 },
                { SubjectID: 216, AssignmentID: 316, TeacherID: 408, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 86 },
                // Science
                { SubjectID: 315, AssignmentID: 415, TeacherID: 508, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 85 },
                { SubjectID: 316, AssignmentID: 416, TeacherID: 508, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 87 },
                // English
                { SubjectID: 415, AssignmentID: 515, TeacherID: 608, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 83 },
                { SubjectID: 416, AssignmentID: 516, TeacherID: 608, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 81 },
            ],
        },
        {
            id: 9,
            StudentID: 9,
            ScoringID: 109,
            StudentName: 'Ian Wilson',
            Scoring: [
                // Math
                { SubjectID: 217, AssignmentID: 317, TeacherID: 409, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 88 },
                { SubjectID: 218, AssignmentID: 318, TeacherID: 409, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 91 },
                // Science
                { SubjectID: 317, AssignmentID: 417, TeacherID: 509, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 84 },
                { SubjectID: 318, AssignmentID: 418, TeacherID: 509, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 89 },
                // English
                { SubjectID: 417, AssignmentID: 517, TeacherID: 609, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 82 },
                { SubjectID: 418, AssignmentID: 518, TeacherID: 609, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 85 },
            ],
        },
        {
            id: 10,
            StudentID: 10,
            ScoringID: 110,
            StudentName: 'Julia Taylor',
            Scoring: [
                // Math
                { SubjectID: 219, AssignmentID: 319, TeacherID: 410, AssignmentType: 'Quiz 1', SubjectName: 'Math', Score: 84 },
                { SubjectID: 220, AssignmentID: 320, TeacherID: 410, AssignmentType: 'Quiz 2', SubjectName: 'Math', Score: 80 },
                // Science
                { SubjectID: 319, AssignmentID: 419, TeacherID: 510, AssignmentType: 'Quiz 1', SubjectName: 'Science', Score: 86 },
                { SubjectID: 320, AssignmentID: 420, TeacherID: 510, AssignmentType: 'Quiz 2', SubjectName: 'Science', Score: 88 },
                // English
                { SubjectID: 419, AssignmentID: 519, TeacherID: 610, AssignmentType: 'Quiz 1', SubjectName: 'English', Score: 83 },
                { SubjectID: 420, AssignmentID: 520, TeacherID: 610, AssignmentType: 'Quiz 2', SubjectName: 'English', Score: 80 },
            ],
        },
        
    ];
    

    const uniqueAssignmentTypes = Array.from(
        new Set(
            studentScorings.flatMap((student) =>
                student.Scoring.map((score) => score.SubjectName)
            )
        )
    );

    const [classData, setClassData] = useState<classDataProps[]>([]);
    const [NewClass, setNewClass] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<number>();
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const handleClassChange = (value: number) => {
        setSelectedClass(value);
    };
    // const handleUpdate = (id: number) => {
    //     setOpen(true);
    //     const classId = classData.find((item) => item.id === id);
    //     const teacherData = teacher.find(
    //         (item) => item.Teacher.TeacherID === classId?.id_teacher
    //     );

    //     if (teacherData) {
    //         setTeacherName(teacherData as teacher);
    //     }
    //     setNewClass(classId?.name as string);

    //     console.log('handleClickOpen clicked', classId);
    // };

    const handleClickOpen = (classId: number) => {
        setSelectedClassId(classId.toString());
        setOpenDelete(true);
    };

    const columns = columnDataSummary(handleClickOpen, uniqueAssignmentTypes);

    const rows = classData.map((row, index) => ({
        ...row,
        isLastRow: index === classData.length - 1, // Set true for the last row
    }));

    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
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

                setClassData(resultClass.data.class);
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
          Summary Scoring
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
                      className=' text-[#31426E]'
                  >
                  Grade&ensp; {classItem.Grade?.grade}
                  </option>
              ))}
                    </select>
                </div>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className='flex h-[80vh] flex-col gap-4 rounded-3xl p-5 text-[#0c427770] shadow-md'>

                <Table
                    data={studentScorings}
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

export default ScoringSummary;
