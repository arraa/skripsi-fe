'use client'

import { deleteStudent } from '@/app/api/student'
import Table from '@/components/common/Table'
import SearchBar from '@/components/common/searchBar'
import { columnData } from '@/components/studentData/column'
import { StudentDataProps } from '@/components/studentData/types/types'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Delete from '../common/dialog/Delete'
import { useRouter } from 'next/navigation'
import { getStudent } from '@/app/api/student'
import { formatStudentData } from '@/lib/formatData'
import { classDataProps } from '../classGenerator/types/types'

const StudentData = () => {
    const [data, setData] = useState<StudentDataProps[]>([])
    const [roles, setRoles] = useState<string>('')

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('roles')
        if (storedRoles) {
            setRoles(storedRoles)
        }
    }, [])
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedClass, setSelectedClass] = useState<number>()
    const [open, setOpen] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
        null
    )
    const router = useRouter()

    const handleClickOpen = (studentId: number) => {
        setSelectedStudentId(studentId.toString())
        console.log('handleClickOpen clicked', studentId)
        setOpen(true)
    }

    const handleAddStudent = () => {
        router.push('/personal-data/student/student-form?action=create')
    }

    const handleUpdate = (id: string) => {
        router.push(
            `/personal-data/student/student-form?action=update&student=${id}`
        )
    }

    const columns = columnData(handleClickOpen, handleUpdate, roles)

    const handleClose = () => {
        setOpen(false)
        setSelectedStudentId(null)
    }

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

    const handleClassChange = (value: number) => {
        setSelectedClass(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            getStudent()
                .then((result) => {
                    const data = formatStudentData(result.data.students)
                    setData(data)

                    const uniqueClassNames = Array.from(
                        new Map(
                            data.map((student: StudentDataProps) => [
                                student.ClassName.name,
                                student.ClassName,
                            ])
                        ).values()
                    )

                    console.log(data)

                    setClassData(uniqueClassNames as classDataProps[])
                })
                .catch((error) => {
                    console.error('API request error', error)
                })
        }
        fetchData()
    }, [])

    const filteredData = data
        .filter((student: StudentDataProps) =>
            selectedClass && selectedClass !== 0
                ? student.ClassName.id === selectedClass
                : true
        )
        .map((student: StudentDataProps, index) => ({
            ...student,
            id: index
        }))

    const deletedStudent = async () => {
        console.log('deletedStudent clicked', selectedStudentId)
        if (selectedStudentId) {
            try {
                const deleted = await deleteStudent(selectedStudentId)
                setSelectedStudentId(null)
                console.log('deleted student', selectedStudentId)
                return deleted
            } catch (error) {
                console.error('API request error', error)
            }
        }
    }

    return (
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '80vw' }}>
            <Delete
                setOpen={handleClose}
                name={'Student'}
                onDelete={deletedStudent}
                open={open}
            />
            <h1 className="mb-6 mt-3 text-3xl font-bold text-[#0C4177]">
                Personal Data
            </h1>
            <div className="flex h-screen flex-col rounded-3xl  bg-white px-5 py-4 text-[#0c427770] shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex gap-4">
                        <SearchBar
                            setSearchValue={handleSearchChange}
                            SearchName={'Student'}
                        />
                        <div>

                            <select
                                id="class-select"
                                className="h-full rounded-md shadow-sm focus:border-[#0C4177] focus:ring focus:ring-[#0C4177]/50"
                                value={selectedClass}
                                onChange={(e) =>
                                    handleClassChange(Number(e.target.value))
                                }
                            >
                                <option value={0}>All Classes</option>
                                {classData.map((classItem) => (
                                    <option
                                        key={classItem.id}
                                        value={classItem.id}
                                    >
                                        {classItem.Grade?.grade}{' '}
                                        {classItem.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {roles != 'teacher' && (
                        <button
                            onClick={handleAddStudent}
                            className="flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md"
                        >
                            &#43;{' '}
                            <span className="hidden pl-3 sm:flex">
                                Add Student
                            </span>
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <Table
                        data={filteredData}
                        columnData={columns}
                        searchValue={searchValue}
                    />
                </div>
            </div>
        </Box>
    )
}

export default StudentData
