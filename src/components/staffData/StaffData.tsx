'use client'

import Table from '@/components/common/Table'
import SearchBar from '@/components/common/searchBar'
import { columnData } from '@/components/staffData/column'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Delete from '../common/dialog/Delete'
import { useRouter } from 'next/navigation'
import { StaffDataProps } from './types/types'
import { deleteStaff, getStaff } from '@/app/api/staff'
// import { deleteStaff, getStaff } from '@/app/api/staff'

const StaffData = () => {
    const [data, setData] = useState<StaffDataProps[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(
        null
    )
    const router = useRouter()

    const handleClickOpen = (staffID: number) => {
        setSelectedStaffId(staffID.toString())
        console.log('handleClickOpen clicked', staffID)
        setOpen(true)
    }

    const handleAddStaff = () => {
        router.push('/personal-data/staff/staff-form?action=create')
    }

    const handleUpdate = (staffID: string) => {
        router.push(
            `/personal-data/staff/staff-form?action=update&staff=${staffID}`
        )
    }

    const columns = columnData(handleClickOpen, handleUpdate)

    const handleClose = () => {
        setOpen(false)
        setSelectedStaffId(null)
    }

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getStaff()

                console.log('result', result.data.staff)

                const rowsWithId = result.data.staff.map(
                    (row: any, index: number) => ({
                        id: index,
                        staff_id: row.StaffID,
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


    const deletedStaff = async () => {
        console.log('deletedStaff clicked', selectedStaffId)
        if (selectedStaffId) {
            try {
                const deleted = await deleteStaff(selectedStaffId)
                setSelectedStaffId(null)
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
                name={'Staff'}
                onDelete={deletedStaff}
                open={open}
            />
            <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                Staff Personal Data
            </h1>
            <div className="flex  flex-col rounded-3xl  bg-white px-5 py-4 text-[#0c427770] shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex gap-4">
                        <SearchBar
                            setSearchValue={handleSearchChange}
                            SearchName={'Staff'}
                        />
                    </div>
                    <button
                        onClick={handleAddStaff}
                        className="flex bg-[#31426E] px-5 pb-2 pt-3 text-white sm:rounded-md"
                    >
                        &#43;{' '}
                        <span className="hidden pl-3 sm:flex">Add Staff</span>
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

export default StaffData
