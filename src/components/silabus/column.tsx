import { Box, Typography } from '@mui/material';
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';

export const columnDataDomain = (
    handleUpdate: (id: number) => void
): GridColDef[] => [
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width: 150,
    //     cellClassName: 'actions',
    //     renderCell: (params: GridRenderCellParams) => {
    //         return (
    //             <Box
    //                 display='flex'
    //                 flexDirection='row'
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
    //                                 src='/icon/icon-edit.svg'
    //                                 alt='edit icon'
    //                                 width={18}
    //                                 height={18}
    //                             />
    //                         }
    //                         label='edit'
    //                     />
    //                 </div>
    //             </Box>
    //         );
    //     },
    // },
    {
        // base on your types
        field: 'domain',
        headerName: 'Domain',
        width: 300,
    },
    {
        field: 'capaianPembelajaran',
        headerName: 'Capaian Pembelajaran',
        width: 300,
    },
];

export const columnDataKontenTujuan = (
    handleUpdate: (id: number) => void
): GridColDef[] => [
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width: 150,
    //     cellClassName: 'actions',
    //     renderCell: (params: GridRenderCellParams) => {
    //         return (
    //             <Box
    //                 display='flex'
    //                 flexDirection='row'
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
    //                                 src='/icon/icon-edit.svg'
    //                                 alt='edit icon'
    //                                 width={18}
    //                                 height={18}
    //                             />
    //                         }
    //                         label='edit'
    //                     />
    //                 </div>
    //             </Box>
    //         );
    //     },
    // },
    {
        // base on your types
        field: 'materi',
        headerName: 'Konten Materi',
        width: 300,
    },
    {
        field: 'tujuanPembelajaran',
        headerName: 'Tujuan Pembelajaran',
        width: 600,
    },
    {
        field: 'JP',
        headerName: 'JP',
        width: 200,
    },
];


export const columnDataDetail = (
    handleUpdate: (id: number) => void
): GridColDef[] => [
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width: 150,
    //     cellClassName: 'actions',
    //     renderCell: (params: GridRenderCellParams) => {
    //         return (
    //             <Box
    //                 display='flex'
    //                 flexDirection='row'
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
    //                                 src='/icon/icon-edit.svg'
    //                                 alt='edit icon'
    //                                 width={18}
    //                                 height={18}
    //                             />
    //                         }
    //                         label='edit'
    //                     />
    //                 </div>
    //             </Box>
    //         );
    //     },
    // },
    {
        // base on your types
        field: 'pertemuan',
        headerName: 'Pertemuan',
        width: 300,
    },
    {
        field: 'tujuanPembelajaran',
        headerName: 'Tujuan Pembelajaran',
        width: 300,
    },
    {
        field: 'kegiatanPembelajaran',
        headerName: 'Kegiatan Pembelajaran',
        width: 300,
    },
];

