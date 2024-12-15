import { Box, Select, Typography } from '@mui/material';
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { ControllerSelectField } from '../common/form/selectField';
import { Controller } from 'react-hook-form';

export const columnData = (
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
                    display='flex'
                    flexDirection='row'
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
                                    src='/icon/icon-edit.svg'
                                    alt='edit icon'
                                    width={18}
                                    height={18}
                                />
                            }
                            label='edit'
                        />
                    </div>
                </Box>
            );
        },
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 200,
    },
    {
        field: 'hadir',
        headerName: 'Hadir',
        width: 200,
    },
    {
        field: 'sakit',
        headerName: 'Sakit',
        width: 200,
    },
    {
        field: 'alfa',
        headerName: 'Alfa',
        width: 300,
    },
];

export const columnDataSummary = (): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
    },
    {
        field: 'hadir',
        headerName: 'Hadir',
        width: 200,
    },
    {
        field: 'sakit',
        headerName: 'Sakit',
        width: 200,
    },
    {
        field: 'izin',
        headerName: 'Izin',
        width: 200,
    },
    {
        field: 'alfa',
        headerName: 'Alfa',
        width: 300,
    },
];

export const columnDataAttendanceForm = (
    status: string[],
    control: any,
    setValue: any,
): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
    },
    {
        field: 'sex',
        headerName: 'Sex',
        width: 200,
    },
    {
        field: 'reason',
        headerName: 'Reason',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={1}
                >
                    <Controller
                        name={`reason-${params.row.id}`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value?.reason || ''}
                                onChange={(event) => {
                                    const selectedValue = event.target.value
                                    setValue(`reason-${params.row.id}`, {
                                        reason: selectedValue,
                                    })
                                }}
                                title={`reason-${params.row.id}`}
                                native
                                aria-label={`reason-${params.row.id}`}
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                {status.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Select>
                        )}
                    />
                </Box>
            )
        },
    },
]
