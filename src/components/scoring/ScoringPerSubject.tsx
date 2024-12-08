'use client'

import Table from '@/components/common/Table'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { Button } from '../common/button/button'
import { StudentScoringPerSubject, SubjectClassDataProps } from './types/types'
import Delete from '../common/dialog/Delete'
import { columnData } from './column'
import { useRouter } from 'next/navigation'
import { getAllSubjectClassName } from '@/app/api/subject'
import { getAllScoreByClassAndSubject } from '@/app/api/score'

// const studentScorings: StudentScoringPerSubject[] = [
//     {
//         id:1,
//         StudentID: 1,
//         ScoringID: 101,
//         StudentName: 'Alice Johnson',
//         Scoring: [
//             {
//                 SubjectID: 201,
//                 AssignmentID: 301,
//                 TeacherID: 401,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 85,
//             },
//             {
//                 SubjectID: 202,
//                 AssignmentID: 302,
//                 TeacherID: 401,
//                 AssignmentType: 'Quiz 4',
//                 SubjectName: 'Math',
//                 Score: 90,
//             },
//         ],
//     },
//     {
//         id:2,
//         StudentID: 2,
//         ScoringID: 102,
//         StudentName: 'Bob Smith',
//         Scoring: [
//             {
//                 SubjectID: 203,
//                 AssignmentID: 303,
//                 TeacherID: 402,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 88,
//             },
//             {
//                 SubjectID: 204,
//                 AssignmentID: 304,
//                 TeacherID: 402,
//                 AssignmentType: 'Quiz 3',
//                 SubjectName: 'Math',
//                 Score: 92,
//             },
//         ],
//     },
//     {
//         id:3,
//         StudentID: 3,
//         ScoringID: 103,
//         StudentName: 'Charlie Davis',
//         Scoring: [
//             {
//                 SubjectID: 205,
//                 AssignmentID: 305,
//                 TeacherID: 403,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 79,
//             },
//             {
//                 SubjectID: 206,
//                 AssignmentID: 306,
//                 TeacherID: 403,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 85,
//             },
//         ],
//     },
//     {
//         id:4,
//         StudentID: 4,
//         ScoringID: 104,
//         StudentName: 'Diana Miller',
//         Scoring: [
//             {
//                 SubjectID: 207,
//                 AssignmentID: 307,
//                 TeacherID: 404,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 94,
//             },
//             {
//                 SubjectID: 208,
//                 AssignmentID: 308,
//                 TeacherID: 404,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 89,
//             },
//         ],
//     },
//     {
//         id:5,
//         StudentID: 5,
//         ScoringID: 105,
//         StudentName: 'Ethan Brown',
//         Scoring: [
//             {
//                 SubjectID: 209,
//                 AssignmentID: 309,
//                 TeacherID: 405,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 81,
//             },
//             {
//                 SubjectID: 210,
//                 AssignmentID: 310,
//                 TeacherID: 405,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 78,
//             },
//         ],
//     },
//     {
//         id:6,
//         StudentID: 6,
//         ScoringID: 106,
//         StudentName: 'Fiona Williams',
//         Scoring: [
//             {
//                 SubjectID: 211,
//                 AssignmentID: 311,
//                 TeacherID: 406,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 90,
//             },
//             {
//                 SubjectID: 212,
//                 AssignmentID: 312,
//                 TeacherID: 406,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 87,
//             },
//         ],
//     },
//     {
//         id:7,
//         StudentID: 7,
//         ScoringID: 107,
//         StudentName: 'George Martinez',
//         Scoring: [
//             {
//                 SubjectID: 213,
//                 AssignmentID: 313,
//                 TeacherID: 407,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 95,
//             },
//             {
//                 SubjectID: 214,
//                 AssignmentID: 314,
//                 TeacherID: 407,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 88,
//             },
//         ],
//     },
//     {
//         id:8,
//         StudentID: 8,
//         ScoringID: 108,
//         StudentName: 'Hannah Lee',
//         Scoring: [
//             {
//                 SubjectID: 215,
//                 AssignmentID: 315,
//                 TeacherID: 408,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 82,
//             },
//             {
//                 SubjectID: 216,
//                 AssignmentID: 316,
//                 TeacherID: 408,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 86,
//             },
//         ],
//     },
//     {
//         id:9,
//         StudentID: 9,
//         ScoringID: 109,
//         StudentName: 'Ian Wilson',
//         Scoring: [
//             {
//                 SubjectID: 217,
//                 AssignmentID: 317,
//                 TeacherID: 409,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 88,
//             },
//             {
//                 SubjectID: 218,
//                 AssignmentID: 318,
//                 TeacherID: 409,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 91,
//             },
//         ],
//     },
//     {
//         id:10,
//         StudentID: 10,
//         ScoringID: 110,
//         StudentName: 'Julia Taylor',
//         Scoring: [
//             {
//                 SubjectID: 219,
//                 AssignmentID: 319,
//                 TeacherID: 410,
//                 AssignmentType: 'Quiz 1',
//                 SubjectName: 'Math',
//                 Score: 84,
//             },
//             {
//                 SubjectID: 220,
//                 AssignmentID: 320,
//                 TeacherID: 410,
//                 AssignmentType: 'Quiz 2',
//                 SubjectName: 'Math',
//                 Score: 80,
//             },
//         ],
//     },
// ];

const ScoringPerSubject = () => {
    const [classDataApi, setClassDataApi] = useState<SubjectClassDataProps[]>(
        []
    )
    const [open, setOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState<{
        SubjectID: number
        ClassID: number
    }>()
    const [scoreClassSubject, setScoreClassSubject] =
        useState<StudentScoringPerSubject[]>([])
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null)

    const handleClassChange = (value: number) => {
        setSelectedClass({
            SubjectID: classDataApi[value].subject_id,
            ClassID: value,
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultSubjectClass = await getAllSubjectClassName()
                if (resultSubjectClass.status !== 200) {
                    throw new Error('API request error')
                }
                const classData = resultSubjectClass.data.subjects.map(
                    (subject: SubjectClassDataProps) => ({
                        subject_id: subject.subject_id,
                        class_name_id: subject.class_name_id,
                        grade_class_name: subject.grade_class_name,
                        subject_name: subject.subject_name,
                    })
                )
                setClassDataApi(classData)
                setSelectedClass({
                    ClassID: classData[0].class_name_id,
                    SubjectID: classData[0].subject_id,
                })
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    // TODO: FIX IF THE scoreClassSubject IS EMPTY
    const uniqueAssignmentTypes = 
        scoreClassSubject
            .flatMap((student) => student.Scoring)
            .map((scoring) => scoring.AssignmentType)
            .filter((value, index, self) => self.indexOf(value) === index)

    const handleClickOpen = (classId: number) => {
        setSelectedClassId(classId.toString())
    }

    const columns = columnData(handleClickOpen, uniqueAssignmentTypes)

    const handleClose = () => {
        setOpen(false)
    }

    const router = useRouter()

    useEffect(() => {
        if (selectedClass) {
            getAllScoreByClassAndSubject(
                selectedClass.ClassID,
                selectedClass.SubjectID
            ).then((response) => {
                setScoreClassSubject(response.data.score)
            })
        }
    }, [selectedClass])

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

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Scoring
                </h1>
                <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                    <label htmlFor="class-select" className="sr-only">
                        Select Class
                    </label>
                    <select
                        id="class-select"
                        className="mx-2 w-full bg-transparent px-6 py-3 text-lg"
                        value={selectedClass?.ClassID}
                        onChange={(e) =>
                            handleClassChange(Number(e.target.value))
                        }
                    >
                        {classDataApi.map((item) => (
                            <option
                                key={item.subject_id}
                                value={item.subject_id}
                            >
                                {item.grade_class_name} - {item.subject_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className="flex h-[80vh] flex-col gap-4 rounded-3xl p-5 text-[#0c427770] shadow-md">
                {/* if you filter not ready you can change data={data} */}
                <div className="flex justify-end">
                    <Button
                        size={'default'}
                        onClick={() => {
                            router.push(
                                `/scoring/scoring-form?action=create&class_id=${selectedClass}`
                            )
                        }}
                    >
                        Add Scoring
                    </Button>
                </div>
                <Table data={scoreClassSubject} columnData={columns} />
                <div className="flex justify-end">
                    <Button size={'default'}>Generate Class</Button>
                </div>
            </div>
            {/* </div> */}
        </Box>
    )
}

export default ScoringPerSubject
