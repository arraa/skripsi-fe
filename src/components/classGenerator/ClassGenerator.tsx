'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { columnData } from './column'
import { deleteClass, getClass } from '@/app/api/class'
import { useEffect, useState } from 'react'
import { Button } from '../common/button/button'
import AddClass from './AddClass'
import { classDataProps, TeacherDataProps } from './types/types'
import Delete from '../common/dialog/Delete'
import { getTeacher } from '@/app/api/teacher'
import Link from 'next/link'

const ClassGenerator = () => {
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [NewClass, setNewClass] = useState<string>('')
    const [open, setOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState<number>()
    const [openDelete, setOpenDelete] = useState(false)
    const [teacherData, setTeacherData] = useState<TeacherDataProps[]>([])
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
    const [teacherName, setTeacherName] = useState<TeacherDataProps>(
        {} as TeacherDataProps
    )
    const handleClassChange = (value: number) => {
        setSelectedClass(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTeacher()

                const rowsWithId = result.data.teachers.map(
                    (row: any, index: number) => ({
                        id: index,
                        teacher_id: row.TeacherID,
                        user_id: row.id_user,
                        ...row,
                    })
                )
                setTeacherData(rowsWithId)
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    const handleUpdate = (id: number) => {
        setOpen(true)
        const classId = classData.find((item) => item.id === id)
        const teacher = teacherData.find(
            (item) => item.teacher_id === classId?.id_teacher
        )

        if (teacher) {
            setTeacherName(teacher as TeacherDataProps)
        }
        setNewClass(classId?.name as string)

        console.log('handleClickOpen clicked', classId)
    }

    const datadummy = [
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 7,
                id: 1,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 1,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 1,
                    name: 'John Doe',
                    gender: 'Male',
                    place_of_birth: 'Jakarta',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 0,
                id_user: 1,
                teacher_id: 1,
                teaching_hour: 20,
                user_id: 1,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 1,
            id_grade: 1,
            id_teacher: 1,
            name: 'A',
        },
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 7,
                id: 4,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 4,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 4,
                    name: 'Emily White',
                    gender: 'Female',
                    place_of_birth: 'Medan',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 3,
                id_user: 4,
                teacher_id: 4,
                teaching_hour: 22,
                user_id: 4,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 4,
            id_grade: 4,
            id_teacher: 4,
            name: 'D',
        },
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 7,
                id: 6,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 6,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 6,
                    name: 'Robert Green',
                    gender: 'Male',
                    place_of_birth: 'Medan',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 5,
                id_user: 6,
                teacher_id: 6,
                teaching_hour: 16,
                user_id: 6,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 6,
            id_grade: 6,
            id_teacher: 6,
            name: 'B',
        },
     
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 8,
                id: 2,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 2,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 2,
                    name: 'Jane Smith',
                    gender: 'Female',
                    place_of_birth: 'Bandung',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 1,
                id_user: 2,
                teacher_id: 2,
                teaching_hour: 25,
                user_id: 2,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 2,
            id_grade: 2,
            id_teacher: 2,
            name: 'A',
        },
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 8,
                id: 5,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 5,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 5,
                    name: 'Sarah Brown',
                    gender: 'Female',
                    place_of_birth: 'Yogyakarta',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 4,
                id_user: 5,
                teacher_id: 5,
                teaching_hour: 18,
                user_id: 5,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 5,
            id_grade: 5,
            id_teacher: 5,
            name: 'B',
        },
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 8,
                id: 7,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 7,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 7,
                    name: 'Anna Lee',
                    gender: 'Female',
                    place_of_birth: 'Bali',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 6,
                id_user: 7,
                teacher_id: 7,
                teaching_hour: 20,
                user_id: 7,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 7,
            id_grade: 7,
            id_teacher: 7,
            name: 'C',
        },
        {
            CreatedAt: '2025-01-03T13:29:41.18305+07:00',
            DeletedAt: null,
            Grade: {
                CreatedAt: '2025-01-03T13:29:41.179875+07:00',
                DeletedAt: null,
                UpdatedAt: '2025-01-03T13:29:41.179875+07:00',
                grade: 9,
                id: 3,
            },
            Teacher: {
                ClassNames: null,
                CreatedAt: '2025-01-03T13:29:41.174816+07:00',
                DeletedAt: null,
                TeacherID: 3,
                TeacherSubject: [{}, {}, {}, {}],
                UpdatedAt: '2025-01-03T13:29:41.174816+07:00',
                User: {
                    id: 3,
                    name: 'Michael Lee',
                    gender: 'Male',
                    place_of_birth: 'Surabaya',
                    date_of_birth:
                        '2025-01-03T13:29:40.812406+07:00',
                },
                id: 2,
                id_user: 3,
                teacher_id: 3,
                teaching_hour: 15,
                user_id: 3,
            },
            UpdatedAt: '2025-01-03T13:29:41.18305+07:00',
            id: 3,
            id_grade: 3,
            id_teacher: 3,
            name: 'A',
        },
     
       
       
    ]


    const handleClickOpen = (classId: number) => {
        setSelectedClassId(classId.toString())
        setOpenDelete(true)
    }

    const columns = columnData(handleClickOpen, handleUpdate)

    const rows = classData.map((row, index) => ({
        ...row,
        isLastRow: index === classData.length - 1, // Set true for the last row
    }))

    const handleClose = () => {
        setOpen(false)
        setOpenDelete(false)
        setTeacherName({} as TeacherDataProps)
    }

    function addNextClass(currentClasses: string) {
        const classArray = currentClasses.split(' ')

        const highestClass = classArray.sort().reverse()[0]
        const nextClass = String.fromCharCode(highestClass.charCodeAt(0) + 1)

        return nextClass
    }

    const handleGenerateClass = () => {
        const currentClasses = classData
            .map((classItem) => classItem.name)
            .join(' ')

        const newClassName = addNextClass(currentClasses)
        setNewClass(`${newClassName}`)
        console.log('New class generated:', newClassName)

        setOpen(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultClass = await getClass()
                const classDataWithTeachers = resultClass.data.ClassName.map(
                    (classItem: classDataProps) => {
                        const matchedTeacher = teacherData.find(
                            (teacher) =>
                                teacher.teacher_id === classItem.id_teacher
                        )
                        return {
                            ...classItem,
                            Teacher: matchedTeacher || null,
                        }
                    }
                )
                setClassData(classDataWithTeachers)
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [teacherData])

    const deletedStudent = async () => {
        console.log('deletedStudent clicked', selectedClassId)
        if (selectedClassId) {
            try {
                const deleted = await deleteClass(Number(selectedClassId))
                setSelectedClassId('')
                console.log('deleted student', deleted)
                return deleted
            } catch (error) {
                console.error('API request error', error)
            }
        }
    }

    console.log('rows', teacherData)

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '84vw' }}>
            <AddClass
                className={NewClass}
                setOpen={handleClose}
                open={open}
                grade={'7'}
                teacher={teacherData}
                teacherName={teacherName}
            />
            <Delete
                setOpen={handleClose}
                name={'Class'}
                onDelete={deletedStudent}
                open={openDelete}
            />
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-4 text-3xl font-bold text-[#0C4177]">
                    Generate Class
                </h1>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className="flex h-[80vh] flex-col gap-4 rounded-3xl p-5 text-[#0C4177] shadow-md">
                {/* if you filter not ready you can change data={data} */}
                <div className="flex justify-end">
                    <Button onClick={handleGenerateClass} size={'default'}>
                        Add Class
                    </Button>
                </div>
                <Table data={datadummy} columnData={columns} />
                <div className="flex justify-end">
                    <Link
                        href={'/generator/class/finalize'}
                        className="rounded-md bg-[#31426E] p-2 px-4 text-white"
                    >
                        Generate Class
                    </Link>
                </div>
            </div>
            {/* </div> */}
        </Box>
    )
}

export default ClassGenerator
