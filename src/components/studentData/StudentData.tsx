'use client'

import { deleteStudent } from '@/app/api/student'
import Table from '@/components/common/Table'
import SearchBar from '@/components/common/searchBar'
import { columnData } from '@/components/studentData/column'
import { StudentDataProps } from '@/components/studentData/types/types'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Delete from '../common/dialog/Delete'
import { useRouter, useSearchParams } from 'next/navigation'
import { getStudent } from '@/app/api/student'
import { formatStudentData } from '@/lib/formatData'
import { classDataProps } from '../classGenerator/types/types'
import { getStudentArchive } from '@/app/api/archive'

const StudentData = () => {
    const [data, setData] = useState<StudentDataProps[]>([])
    const [roles, setRoles] = useState<string>('')

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('role')
        if (storedRoles) {
            setRoles(storedRoles)
        }
    }, [])

    console.log('roles', roles.includes('admin'))

    const [classData, setClassData] = useState<classDataProps[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedClass, setSelectedClass] = useState<number>()
    const [open, setOpen] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
        null
    )
    const router = useRouter()

    const searchParams = useSearchParams()

    const archive = searchParams.get('archive')
    const academicYear = searchParams.get('ac')

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

    const columns = columnData(
        handleClickOpen,
        handleUpdate,
        roles,
        archive as string
    )

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
            if (archive === 'true') {
                getStudentArchive(academicYear as string)
                    .then((res) => {
                        const data = formatStudentData(res.data['student-personal-data'])
                        setData(data)

                        console.log('masukkkkkk',res.data['student-personal-data'], data)
                        const uniqueClassNames = Array.from(
                            new Map(
                                data.map((student: StudentDataProps) => [
                                    `${student.ClassName.name}-${student.ClassName.Grade.grade}`, 
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
            } else {
                getStudent()
                    .then((result) => {
                        const data = formatStudentData(result.data.students)
                        setData(data)

                        const uniqueClassNames = Array.from(
                            new Map(
                                data.map((student: StudentDataProps) => [
                                    `${student.ClassName.name}-${student.ClassName.Grade.grade}`, 
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
            id: index,
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
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '84vw' }}>
            <Delete
                setOpen={handleClose}
                name={'Student'}
                onDelete={deletedStudent}
                open={open}
            />
            <h1 className="mb-6 mt-2 text-3xl font-bold text-[#0C4177]">
                Student Personal Data
            </h1>
            <div className="flex flex-col rounded-3xl  bg-white px-5 py-4 text-[#0C4177] shadow-md">
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

                    {roles.includes('admin') ||
                        roles.includes('staff') ||
                        (archive !== 'true' && (
                            <button
                                onClick={handleAddStudent}
                                className="flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md"
                            >
                                &#43;{' '}
                                <span className="hidden pl-3 sm:flex">
                                    Add Student
                                </span>
                            </button>
                        ))}
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
