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
                <Table data={rows} columnData={columns} />
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
