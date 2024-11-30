'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { getClass } from '@/app/api/class'
import { useEffect, useState } from 'react'
import { Button } from '../common/button/button'
import { AttendanceProps } from './type/types'
import { classDataProps } from '../studentData/types/types'
import { columnData } from './column'
import { useRouter } from 'next/navigation'
import { getAttendanceByMonth } from '@/app/api/attendance'
import { formatDateAttendance } from './interface/dateInterface'
import { getUserType } from '@/app/api/auth'

interface dateProps {
    month: number
    year: number
}

const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const AttendanceToday = () => {
    const grade = [7, 8, 9]
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [attendance, setAttendance] = useState<AttendanceProps[]>([])
    const [NewClass, setNewClass] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState<number>(0)
    const [selectedDate, setselectedDate] = useState<dateProps>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    })
    const [openDelete, setOpenDelete] = useState(false)

    const handleClassChange = (value: number) => {
        setSelectedClass(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getClass()
                // const userType = await getUserType();
                setClassData(result.data.ClassName)
                setSelectedClass(result.data.ClassName[0].id)
            } catch (error) {
                console.error('API request error getClass:', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAttendanceByMonth(
                    selectedClass,
                    new Date(selectedDate.year, selectedDate.month)
                )

                setAttendance(
                    (result.attendance &&
                        result.attendance.map((item, index: number) => ({
                            id: index,
                            date: item.date,
                            hadir: item.present_total,
                            sakit: item.sick_total,
                            alfa: item.absent_total,
                        }))) ||
                        []
                )
            } catch (error) {
                console.error('API request error', error)
            }
        }
        if (selectedClass !== 0) {
            fetchData()
        }
    }, [classData, selectedClass, selectedDate])
    const handleEditAttendance = (id: number) => {
        router.push(
            `/attendance/attendance-form?action=edit&class_id=${selectedClass}&date=${attendance[id].date}`
        )
    }

    const rows = columnData(handleEditAttendance)
    const router = useRouter()

    const handleAddAttendance = () => {
        router.push(
            `/attendance/attendance-form?action=create&class_id=${selectedClass}`
        );
    }

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Attendance
                </h1>
                <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                    <label htmlFor="date-select" className="sr-only">
                        Select Date
                    </label>
                    <select
                        id="date-select"
                        className="mx-2 w-full bg-transparent px-6 py-3 text-lg"
                        value={`${selectedDate.month} ${selectedDate.year}`}
                        onChange={(e) => {
                            const [month, year] = e.target.value.split(' ')
                            setselectedDate({
                                month: Number(month),
                                year: Number(year),
                            })
                        }}
                    >
                        {month.map((month, index) => (
                            <option
                                key={index}
                                value={`${index} ${new Date().getFullYear()}`}
                            >
                                {month} {new Date().getFullYear()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex h-[80vh] flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                <div className="flex items-center justify-between">
                    <Button onClick={handleAddAttendance} size={'default'}>
                        add Attendance
                    </Button>

                    <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                        <label
                            htmlFor="select-class-add-attendance"
                            className="sr-only"
                        >
                            Select Month
                        </label>
                        <select
                            id="select-class-add-attendance"
                            className="mx-2  bg-transparent px-6 py-2 text-lg"
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
                                    >
                                        Grade&ensp; {classItem.Grade?.grade}
                                        {classItem.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <Table
                    data={attendance.map((item: AttendanceProps) => ({
                        ...item,
                        date: formatDateAttendance(item.date),
                    }))}
                    columnData={rows}
                />
            </div>
        </Box>
    )
}

export default AttendanceToday
