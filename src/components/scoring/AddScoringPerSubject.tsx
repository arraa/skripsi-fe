'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button } from '../common/button/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { array, InferInput, minLength, object, pipe, string } from 'valibot'
import { getAllStudentAttendanceByClassIDAndDate } from '@/app/api/attendance'
import { columnDataScoringForm } from './column'
import {
    StudentScoringPerSubject,
    StudentScoringPerSubjectForm,
} from './types/types'
import { AttendanceListFormProps } from '../attendance/type/types'

const ObjectSchema = array(
    object({
        reason: string(),
    })
)

const studentScorings: StudentScoringPerSubject[] = [
    {
        id: 1,
        StudentID: 1,
        ScoringID: 101,
        StudentName: 'Alice Johnson',
        Scoring: [
            {
                SubjectID: 201,
                AssignmentID: 301,
                TeacherID: 401,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 85,
            },
            {
                SubjectID: 202,
                AssignmentID: 302,
                TeacherID: 401,
                AssignmentType: 'Quiz 4',
                SubjectName: 'Math',
                Score: 90,
            },
        ],
    },
    {
        id: 2,
        StudentID: 2,
        ScoringID: 102,
        StudentName: 'Bob Smith',
        Scoring: [
            {
                SubjectID: 203,
                AssignmentID: 303,
                TeacherID: 402,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 88,
            },
            {
                SubjectID: 204,
                AssignmentID: 304,
                TeacherID: 402,
                AssignmentType: 'Quiz 3',
                SubjectName: 'Math',
                Score: 92,
            },
        ],
    },
    {
        id: 3,
        StudentID: 3,
        ScoringID: 103,
        StudentName: 'Charlie Davis',
        Scoring: [
            {
                SubjectID: 205,
                AssignmentID: 305,
                TeacherID: 403,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 79,
            },
            {
                SubjectID: 206,
                AssignmentID: 306,
                TeacherID: 403,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 85,
            },
        ],
    },
    {
        id: 4,
        StudentID: 4,
        ScoringID: 104,
        StudentName: 'Diana Miller',
        Scoring: [
            {
                SubjectID: 207,
                AssignmentID: 307,
                TeacherID: 404,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 94,
            },
            {
                SubjectID: 208,
                AssignmentID: 308,
                TeacherID: 404,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 89,
            },
        ],
    },
    {
        id: 5,
        StudentID: 5,
        ScoringID: 105,
        StudentName: 'Ethan Brown',
        Scoring: [
            {
                SubjectID: 209,
                AssignmentID: 309,
                TeacherID: 405,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 81,
            },
            {
                SubjectID: 210,
                AssignmentID: 310,
                TeacherID: 405,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 78,
            },
        ],
    },
    {
        id: 6,
        StudentID: 6,
        ScoringID: 106,
        StudentName: 'Fiona Williams',
        Scoring: [
            {
                SubjectID: 211,
                AssignmentID: 311,
                TeacherID: 406,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 90,
            },
            {
                SubjectID: 212,
                AssignmentID: 312,
                TeacherID: 406,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 87,
            },
        ],
    },
    {
        id: 7,
        StudentID: 7,
        ScoringID: 107,
        StudentName: 'George Martinez',
        Scoring: [
            {
                SubjectID: 213,
                AssignmentID: 313,
                TeacherID: 407,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 95,
            },
            {
                SubjectID: 214,
                AssignmentID: 314,
                TeacherID: 407,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 88,
            },
        ],
    },
    {
        id: 8,
        StudentID: 8,
        ScoringID: 108,
        StudentName: 'Hannah Lee',
        Scoring: [
            {
                SubjectID: 215,
                AssignmentID: 315,
                TeacherID: 408,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 82,
            },
            {
                SubjectID: 216,
                AssignmentID: 316,
                TeacherID: 408,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 86,
            },
        ],
    },
    {
        id: 9,
        StudentID: 9,
        ScoringID: 109,
        StudentName: 'Ian Wilson',
        Scoring: [
            {
                SubjectID: 217,
                AssignmentID: 317,
                TeacherID: 409,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 88,
            },
            {
                SubjectID: 218,
                AssignmentID: 318,
                TeacherID: 409,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 91,
            },
        ],
    },
    {
        id: 10,
        StudentID: 10,
        ScoringID: 110,
        StudentName: 'Julia Taylor',
        Scoring: [
            {
                SubjectID: 219,
                AssignmentID: 319,
                TeacherID: 410,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 84,
            },
            {
                SubjectID: 220,
                AssignmentID: 320,
                TeacherID: 410,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 80,
            },
        ],
    },
]

type ObjectInput = InferInput<typeof ObjectSchema>

const ScoringSubjectForm = () => {
    const searchParams = useSearchParams()
    const actionType = searchParams.get('action')
    const classID = Number(searchParams.get('class_id'))
    const dateString = searchParams.get('date')
    const date = useMemo(() => {
        const correctedDateString = dateString?.replace(' ', '+')
        return correctedDateString ? new Date(correctedDateString) : new Date()
    }, [dateString])
    const status = ['Present', 'Sick', 'Leave', 'Absent']

    const [studentAttendanceList, setStudentAttendanceList] =
        useState<StudentScoringPerSubject[]>(studentScorings)
    const [open, setOpen] = useState(false)
    const [formattedDate, setFormattedDate] = useState('')

    const [selectedOption, setSelectedOption] = useState('')
    const [customOption, setCustomOption] = useState('')
    const [showCustomInput, setShowCustomInput] = useState(false)

    // Handle option change
    const handleOptionChange = (option: SetStateAction<string>) => {
        setSelectedOption(option)
        if (option === 'Tambahkan opsi') {
            setShowCustomInput(true) // Show input when "Tambahkan opsi" is selected
        } else {
            setShowCustomInput(false)
        }
    }

    useEffect(() => {
        const dateObj = new Date(date.toString())
        const formatted = dateObj.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        setFormattedDate(formatted)
    }, [date])

    const { handleSubmit, control, setValue, reset } =
        useForm<StudentScoringPerSubject>({
            defaultValues: {},
        })

    const onSubmit = (data: StudentScoringPerSubject) => {
        console.log(data)

        const submittedData = studentAttendanceList.map((student) => {
            const reasonKey = `scoring-${student.StudentID}`
            const studentScore =
                data[reasonKey as keyof StudentScoringPerSubject]

            console.log('reason key', studentScore)

            return {
                StudentName: student.StudentName,
                studentID: student.StudentID,
                score: studentScore,
            }
        })

        console.log('Submitted data:', submittedData)
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const resultStudentAttendanceList =
    //       await getAllStudentAttendanceByClassIDAndDate(classID, date);

    //             const defaultValues =
    //       resultStudentAttendanceList.attendance.reduce<StudentScoringPerSubject>(
    //           (acc, student, index) => {
    //               acc[`reason-${index}`] = {
    //                   reason: student.reason || '',
    //               };
    //               return acc;
    //           },
    //           {}
    //       );
    //             reset(defaultValues);

    //             setStudentAttendanceList(
    //                 resultStudentAttendanceList.attendance.map(
    //                     (
    //                         student: AllStudentAttendanceByClassIDAndDateProps,
    //                         index: number
    //                     ) => ({
    //                         id: index,
    //                         student_id: student.id.toString(),
    //                         name: student.name,
    //                         sex: student.sex,
    //                         reason: student.reason,
    //                     })
    //                 )
    //             );
    //         } catch (error) {
    //             console.error('API request error', error);
    //         }
    //     };
    //     fetchData();
    // }, [classID, date, reset]);

    const rows = columnDataScoringForm(status, control, setValue)

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Attendance Class
                </h1>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className="flex h-[80vh] flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-h-[80vh] text-[#353535]"
                >
                    <div className=" flex w-full justify-start text-base  text-[#0c42777a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ">
                        <div className="relative w-1/4">
                            <div className="relative">
                                <div className="relative ">
                                    <button
                                        id="custom-dropdown"
                                        className="w-full rounded-lg border  p-2 text-left"
                                        onClick={() =>
                                            setShowCustomInput((prev) => !prev)
                                        }
                                    >
                                        {selectedOption ||
                                            'Input Assignment Type...'}
                                    </button>

                                    {showCustomInput && (
                                        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white ">
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOptionChange('PAS')
                                                }
                                            >
                                                PAS
                                            </div>
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOptionChange('PTS')
                                                }
                                            >
                                                PTS
                                            </div>
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOptionChange(
                                                        'Tambahkan opsi'
                                                    )
                                                }
                                            >
                                                Tambahkan Tugas Lainnya
                                            </div>
                                            {selectedOption ===
                                                'Tambahkan opsi' && (
                                                <>
                                                    <div className="p-2">
                                                        <input
                                                            type="text"
                                                            value={customOption}
                                                            onChange={(e) =>
                                                                setCustomOption(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="mt-2 w-full rounded-lg border p-2"
                                                            placeholder="Ketik opsi Anda..."
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={() => {
                                                            if (
                                                                selectedOption ===
                                                                    'Tambahkan opsi' &&
                                                                customOption.trim()
                                                            ) {
                                                                setSelectedOption(
                                                                    customOption
                                                                )
                                                                setShowCustomInput(
                                                                    false
                                                                )
                                                            }
                                                        }}
                                                        size={'full'}
                                                    >
                                                        {' '}
                                                        Tambah{' '}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Table
                        data={studentScorings}
                        columnData={rows}
                        heighRow={50}
                    />

                    <div className="mb-4 flex justify-end">
                        <Button
                            onSubmit={handleSubmit(onSubmit)}
                            type="submit"
                            size={'submit'}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    )
}

export default ScoringSubjectForm
