import { Box, Typography } from '@mui/material';
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StaffDataProps } from './types/types';

export const columnData = (
    handleClickOpen: (id: number) => void,
    handleUpdate: (id: string) => void
): GridColDef[] => [
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        cellClassName: 'actions',
        renderCell: (params: GridRenderCellParams<StaffDataProps>) => (
            <Box
                display='flex'
                flexDirection='row'
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
            >
                <div
                    onClick={() =>
                        params.row.staff_id &&
                        handleUpdate(params.row.staff_id.toString())
                    }
                >
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
                <GridActionsCellItem
                    sx={{ boxShadow: 3, borderRadius: 1, padding: '5px' }}
                    key={'delete'}
                    icon={
                        <Image
                            src='/icon/icon-delete.svg'
                            alt='delete icon'
                            width={18}
                            height={18}
                        />
                    }
                    label='Delete'
                    onClick={() =>
                        handleClickOpen(Number(params.row.staff_id))
                    }
                />
            </Box>
        ),
    },
    {
        field: 'name',
        headerName: 'Full Name',
        width: 250,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>{params.row.User.name}</Typography>
        ),
    },
    {
        field: 'gender',
        headerName: 'Sex',
        width: 100,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>{params.row.User.gender}</Typography>
        ),
    },
    {
        field: 'place_of_birth',
        headerName: 'Place & Date of Birth',
        width: 180,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>{params.row.User.place_of_birth}</Typography>
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 300,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>{params.row.User.address}</Typography>
        ),
    },
    {
        field: 'num_phone',
        headerName: 'Phone Number',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>{params.row.User.num_phone}</Typography>
        ),
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
            <Typography>{params.row.User.email}</Typography>
        ),
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 160,
    },
];
