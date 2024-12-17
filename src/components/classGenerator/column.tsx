import { Box, Select, Typography } from '@mui/material'
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid'
import Image from 'next/image'
import { Controller } from 'react-hook-form'
import { classDataProps, classGeneratorStudentProps } from './types/types'

export const columnData = (
    handleClickOpen: (id: number) => void,
    handleUpdate: (id: number) => void
): GridColDef[] => [
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        cellClassName: 'actions',
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                >
                    <div onClick={() => handleUpdate(params.row.id)}>
                        <GridActionsCellItem
                            sx={{
                                boxShadow: 3,
                                borderRadius: 1,
                                padding: '5px',
                            }}
                            key={'edit'}
                            icon={
                                <Image
                                    src="/icon/icon-edit.svg"
                                    alt="edit icon"
                                    width={18}
                                    height={18}
                                />
                            }
                            label="edit"
                        />
                    </div>
                    {params.row.isLastRow && (
                        <div onClick={() => handleClickOpen(params.row.id)}>
                            <GridActionsCellItem
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 1,
                                    padding: '5px',
                                }}
                                key={'delete'}
                                icon={
                                    <Image
                                        src="/icon/icon-delete.svg"
                                        alt="delete icon"
                                        width={18}
                                        height={18}
                                    />
                                }
                                label="Delete"
                            />
                        </div>
                    )}
                </Box>
            )
        },
    },
    {
        // base on your types
        field: 'name',
        headerName: 'Class Name',
        width: 300,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>
                {' '}
                {params.row.Grade?.grade}
                {params.value}{' '}
            </Typography>
        ),
    },
    {
        field: 'id_teacher',
        headerName: 'Teacher',
        width: 300,
        renderCell: (params: GridRenderCellParams) => (
            <Typography> {params.row.Teacher?.User.name}</Typography>
        ),
    },
]

export const columnDataSiswa = (
    control: any,
    setValue: any,
    classData: classDataProps[],
    studentData: classGeneratorStudentProps[],
    setStudentData: React.Dispatch<
        React.SetStateAction<classGeneratorStudentProps[]>
    >
): GridColDef[] => [
    {
        field: 'id',
        headerName: 'No.',
        width: 300,
    },
    {
        field: 'name',
        headerName: 'Full Name',
        width: 300,
    },
    {
        field: 'gender',
        headerName: 'Gander',
        width: 300,
    },
    {
        field: 'class',
        headerName: 'Class',
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Controller
                        name={`class_name_id-${params.row.id}`}
                        control={control}
                        defaultValue={params.row.ClassName.id} // Set default to params.row.id_class
                        render={({ field }) => {
                            return (
                                <Select
                                    {...field}
                                    value={
                                        field.value ||
                                        params.row.ClassName.id
                                    } // Use field.value or fallback to params.row.id_class
                                    onChange={(event) => {
                                        const selectedValue = event.target.value
                                            ? Number(event.target.value)
                                            : params.row.ClassName.id

                                        setValue(
                                            `class_name_id-${params.row.id}`,
                                            selectedValue
                                        )

                                        // Update studentData when class changes
                                        const updatedStudentData =
                                            studentData.map((student) =>
                                                student.student_id ===
                                                params.row.StudentID.toString()
                                                    ? {
                                                        ...student,
                                                        class_name_id: selectedValue.toString(),
                                                    }
                                                    : student
                                            )
                                        setStudentData(updatedStudentData)
                                    }}
                                    title={`class_name_id-${params.row.id}`}
                                    native
                                    aria-label={`class_name_id-${params.row.id}`}
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    {classData.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.Grade?.grade} - {item.name}
                                        </option>
                                    ))}
                                </Select>
                            )
                        }}
                    />
                </Box>
            )
        },
    },
]
