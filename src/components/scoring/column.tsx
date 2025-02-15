import { Box, Typography } from '@mui/material'
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid'
import Image from 'next/image'
import { ControllerField } from '../common/form/textField'
import { Controller } from 'react-hook-form'
import { StudentScoringPerSubject } from './types/types'

export const columnData = (
    handleUpdate: (id: number) => void,
    dataAssignMent: string[]
): GridColDef[] => {
    const dynamicColumns: GridColDef[] = dataAssignMent.map((item: string) => ({
        field: item,
        headerName: item,
        width: 300,
        renderCell: (
            params: GridRenderCellParams<StudentScoringPerSubject>
        ) => {
            const scoringData = params.row.Scores

            const matchedScore = scoringData.find(
                (scoreItem: any) => scoreItem.AssignmentType === item
            )

            return matchedScore ? (
                <Typography>{matchedScore.Score}</Typography>
            ) : (
                <Typography>No Score</Typography>
            )
        },
    }))

    return [
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
                    </Box>
                )
            },
        },
        {
            field: 'StudentName',
            headerName: 'Full Name',
            width: 300,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>
                    {params.row.Grade?.grade}
                    {params.value}
                </Typography>
            ),
        },
        ...dynamicColumns,
    ]
}

export const columnDataScoringForm = (control: any): GridColDef[] => [
    {
        field: 'id',
        headerName: 'No.',
        width: 100,
    },
    {
        field: 'StudentName',
        headerName: 'Name',
        width: 350,
    },
    {
        field: 'score',
        headerName: 'Score',
        width: 200,
        renderCell: (params: GridRenderCellParams<StudentScoringFormProps>) => {
            return (
                <div className="m-0 p-0">
                    <Controller
                        name={`${params.row.StudentID}`}
                        control={control}
                        rules={{
                            required: 'Score is required',
                            min: {
                                value: 0,
                                message: 'Score cannot be less than 0',
                            },
                            max: {
                                value: 100,
                                message: 'Score cannot be more than 100',
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                id={`${params.row.id}`}
                                className="m-0 h-1/2 bg-transparent  p-1 outline outline-1 focus:bg-none"
                                type={'number'}
                                min={0}
                                max={100}
                                onBlur={(e) => {
                                    const value = Number(e.target.value)
                                    if (value < 0) {
                                        alert('Score cannot be less than 0')
                                    } else if (value > 100) {
                                        alert('Score cannot be more than 100')
                                    }
                                    field.onBlur()
                                }}
                            />
                        )}
                    />
                </div>
            )
        },
    },
]

export const columnDataSummary = (
    handleUpdate: (id: number) => void,
    dataAssignMent: string[]
): GridColDef[] => {
    const dynamicColumns: GridColDef[] = dataAssignMent.map((item: string) => ({
        field: item,
        headerName: item,
        width: 300,
        renderCell: (params: GridRenderCellParams) => {
            const scoringData = params.row.Scores

            const matchedScore = scoringData.find(
                (scoreItem: any) => scoreItem.SubjectName === item
            )

            return <Typography>{matchedScore.Score}</Typography>
        },
    }))

    return [
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 150,
        //     cellClassName: 'actions',
        //     renderCell: (params: GridRenderCellParams) => {
        //         return (
        //             <Box
        //                 display="flex"
        //                 flexDirection="row"
        //                 alignItems={'center'}
        //                 justifyContent={'center'}
        //                 gap={2}
        //             >
        //                 <div onClick={() => handleUpdate(params.row.id)}>
        //                     <GridActionsCellItem
        //                         sx={{
        //                             boxShadow: 3,
        //                             borderRadius: 1,
        //                             padding: '5px',
        //                         }}
        //                         key={'edit'}
        //                         icon={
        //                             <Image
        //                                 src="/icon/icon-edit.svg"
        //                                 alt="edit icon"
        //                                 width={18}
        //                                 height={18}
        //                             />
        //                         }
        //                         label="edit"
        //                     />
        //                 </div>
        //             </Box>
        //         )
        //     },
        // },
        {
            field: 'StudentName',
            headerName: 'Full Name',
            width: 300,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>
                    {params.row.Grade?.grade}
                    {params.value}
                </Typography>
            ),
        },
        ...dynamicColumns,
    ]
}
