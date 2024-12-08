'use client'

import Table from '@/components/common/Table'
import SearchBar from '@/components/common/searchBar'
import { columnData } from '@/components/teacherData/column'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Delete from '../common/dialog/Delete'
import { useRouter } from 'next/navigation'
import { TeacherDataProps } from './types/types'
import { deleteTeacher, getTeacher } from '@/app/api/teacher'

const TeacherData = () => {
    const [data, setData] = useState<TeacherDataProps[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
        null
    )
    const router = useRouter()

    const handleClickOpen = (teacherID: number) => {
        setSelectedTeacherId(teacherID.toString())
        console.log('handleClickOpen clicked', teacherID)
        setOpen(true)
    }

    const handleAddTeacher = () => {
        router.push('/personal-data/teacher/teacher-form?action=create')
    }

    const handleUpdate = (teacherID: string) => {
        router.push(
            `/personal-data/teacher/teacher-form?action=update&teacher=${teacherID}`
        )
    }

    const columns = columnData(handleClickOpen, handleUpdate)

    const handleClose = () => {
        setOpen(false)
        setSelectedTeacherId(null)
    }

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
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
                setData(rowsWithId)
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    const deletedTeacher = async () => {
        console.log('deletedTeacher clicked', selectedTeacherId)
        if (selectedTeacherId) {
            try {
                const deleted = await deleteTeacher(selectedTeacherId)
                setSelectedTeacherId(null)
                return deleted
            } catch (error) {
                console.error('API request error', error)
            }
        }
    }

    return (
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '85vw' }}>
            <Delete
                setOpen={handleClose}
                name={'Teacher'}
                onDelete={deletedTeacher}
                open={open}
            />
            <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                Teacher Personal Data
            </h1>
            <div className="flex  flex-col rounded-3xl  bg-white px-5 py-4 text-[#0c427770] shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex gap-4">
                        <SearchBar
                            setSearchValue={handleSearchChange}
                            SearchName={'Teacher'}
                        />
                    </div>
                    <button
                        onClick={handleAddTeacher}
                        className="flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md"
                    >
                        &#43;{' '}
                        <span className="hidden pl-3 sm:flex">Add Teacher</span>
                    </button>
                </div>
                <Table
                    data={data}
                    columnData={columns}
                    searchValue={searchValue}
                />
            </div>
        </Box>
    )
}

export default TeacherData
