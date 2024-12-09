import { Box, Typography } from '@mui/material';
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';

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
        // base on your types
        field: 'Time',
        headerName: 'Time',
        width: 300,
    },
    {
        // base on your types
        field: 'Subject',
        headerName: 'Subject',
        width: 300,
    },
    {
        // base on your types
        field: 'Teacher',
        headerName: 'Teacher',
        width: 300,
    },

   
];

export const columnDataSiswa = (): GridColDef[] => [
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
        width: 100,
    },
];
