'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { getClass } from '@/app/api/class'
import { act, useEffect, useMemo, useState } from 'react'
import { Button } from '../common/button/button'
import Delete from '../common/dialog/Delete'
import {
    AllStudentAttendanceByClassIDAndDateProps,
    AttendanceFormData,
    AttendanceListFormProps,
    StudentAttendanceListProps,
} from './type/types'
import { classDataProps } from '../classGenerator/types/types'
import { columnDataAttendanceForm } from './column'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { array, InferInput, minLength, object, pipe, string } from 'valibot'
import {
    AttendancePropsSubmitApi,
    createAttendance,
    getAllStudentAttendanceByClassIDAndDate,
    updateAttendance,
} from '@/app/api/attendance'
import { getStudentClassNameID } from '@/app/api/student'

const ObjectSchema = array(
    object({
        reason: string(),
    })
)

type ObjectInput = InferInput<typeof ObjectSchema>

const AttendanceForm = () => {
    const searchParams = useSearchParams()
    const actionType = searchParams.get('action')
    const classID = Number(searchParams.get('class_id'))
    const dateString = searchParams.get('date')
    const date = useMemo(() => {
        const correctedDateString = dateString?.replace(' ', '+')
        return correctedDateString ? new Date(correctedDateString) : new Date()
    }, [dateString])
    const status = ['Present', 'Sick', 'Leave', 'Absent']

    const [studentAttendanceList, setStudentAttendanceList] = useState<
        AttendanceListFormProps[]
    >([])
    const [open, setOpen] = useState(false)
    const [formattedDate, setFormattedDate] = useState('')

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
        useForm<AttendanceFormData>({
            defaultValues: {},
        })

    const onSubmit = (data: AttendanceFormData) => {
        const submittedData = studentAttendanceList.map((student) => {
            const reasonKey = `reason-${student.id}`
            const reason = data[reasonKey]?.reason || ''
            return {
                student_id: student.student_id,
                reason,
            }
        })
        const correctedDateString: string = dateString?.replace(' ', '+') || ''

        const outputData: AttendancePropsSubmitApi = {
            classID: classID,
            date: new Date(correctedDateString),
            data: submittedData,
        }

        if (actionType === 'edit') {
            updateAttendance(outputData)
                .then(() => {
                    alert('Attendance has been updated')
                })
                .catch((error) => {
                    console.error('API request error', error)
                })
        } else {
            createAttendance(outputData)
                .then(() => {
                    alert('Attendance has been submitted')
                })
                .catch((error) => {
                    console.error('API request error', error)
                })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultStudentAttendanceList =
                    await getAllStudentAttendanceByClassIDAndDate(classID, date)

                const defaultValues =
                    resultStudentAttendanceList.attendance.reduce<AttendanceFormData>(
                        (acc, student) => {
                            acc[`reason-${student.id}`] = {
                                reason: student.reason || '',
                            }
                            return acc
                        },
                        {}
                    )
                reset(defaultValues)

                const mapStudentAttendance = (
                    student: StudentAttendanceListProps,
                    index: number
                ) => {
                    return {
                        id: index,
                        student_id: String(student.StudentID),
                        name: student.name,
                        sex: student.gender,
                        reason: '',
                        date: new Date(),
                    }
                }

                const mapExistingAttendance = (
                    student: AllStudentAttendanceByClassIDAndDateProps
                ) => {
                    return {
                        id: student.id,
                        student_id: student.id.toString() || '',
                        name: student.name,
                        sex: student.sex,
                        reason: student.reason,
                        date: new Date(student.date),
                    }
                }

                const fetchStudentClassData = async (classID: number) => {
                    const response = await getStudentClassNameID(classID)
                    return response.data.students
                }

                const setAttendanceList = (attendanceData: any[]) => {
                    setStudentAttendanceList(attendanceData)
                }

                const handleStudentAttendance = async (
                    classID: number,
                    resultStudentAttendanceList: any
                ) => {
                    if (resultStudentAttendanceList.attendance.length === 0) {
                        try {
                            const students = await fetchStudentClassData(
                                classID
                            )
                            const mappedStudents =
                                students.map(mapStudentAttendance)
                            setAttendanceList(mappedStudents)
                        } catch (error) {
                            console.error(
                                'Error fetching student class data',
                                error
                            )
                        }
                    } else {
                        const mappedAttendance =
                            resultStudentAttendanceList.attendance.map(
                                mapExistingAttendance
                            )
                        setAttendanceList(mappedAttendance)
                    }
                }

                // Usage
                handleStudentAttendance(classID, resultStudentAttendanceList)
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [classID, date, reset, actionType])

    const rows = columnDataAttendanceForm(status, control, setValue)

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
                    className="text-[#353535]"
                >
                    <div className="mb-4 ml-3 mt-10 flex justify-start text-xl font-bold text-[#0c42777a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ">
                        {formattedDate}
                    </div>

                    <Table
                        data={studentAttendanceList}
                        columnData={rows}
                        heighRow={75}
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

export default AttendanceForm
