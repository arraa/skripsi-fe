'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { getClass } from '@/app/api/class'
import { useEffect, useState } from 'react'
import { Button } from '../common/button/button'
import Delete from '../common/dialog/Delete'
import { SummaryAttendanceShowProps } from './type/types'
import { classDataProps } from '../classGenerator/types/types'
import { columnDataSummary } from './column'
import {
    getAllSummaryAttendanceByClassIDAndYear,
    SummaryAttendanceByClassIDAndYearApiProps,
} from '@/app/api/attendance'

const AttendanceSummary = () => {
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [selectedClass, setSelectedClass] = useState<number>()
    const [attendanceData, setAttendanceData] = useState<
        SummaryAttendanceShowProps[]
    >([])

    const handleClassChange = (value: number) => {
        setSelectedClass(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultClass = await getClass()

                console.log(resultClass)

                setClassData(resultClass.data.ClassName)
                setSelectedClass(resultClass.data.ClassName[0].id)
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (selectedClass !== undefined) {
                getAllSummaryAttendanceByClassIDAndYear(selectedClass)
                    .then((res: SummaryAttendanceByClassIDAndYearApiProps) => {
                        setAttendanceData(
                            res.attendance.map((item) => ({
                                id: item.student_id,
                                name: item.student_name,
                                hadir: item.present_total,
                                sakit: item.sick_total,
                                izin: item.leave_total,
                                alfa: item.absent_total,
                            }))
                        )
                    })
                    .catch(() => {
                        setAttendanceData([])
                    })
            }
        }
        fetchData()
    }, [selectedClass])

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '84vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Attendance
                </h1>
                <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                    <label htmlFor="select-class" className="sr-only">
                        Select Class
                    </label>
                    <select
                        id="select-class"
                        className="mx-2 w-full bg-transparent px-6 py-3 text-lg"
                        value={selectedClass}
                        onChange={(e) =>
                            handleClassChange(Number(e.target.value))
                        }
                    >
                        {classData &&
                            classData.map((classItem) => (
                                <option
                                    key={classItem.id}
                                    value={classItem.id}
                                    className="text-[#0C4177]"
                                >
                                    Class&ensp; {classItem.Grade?.grade}
                                    {classItem.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className="flex h-[80vh] flex-col gap-4 rounded-3xl bg-white p-5 text-[#0C4177] shadow-md">
                <Table data={attendanceData} columnData={columnDataSummary()} />
            </div>
        </Box>
    )
}

export default AttendanceSummary
