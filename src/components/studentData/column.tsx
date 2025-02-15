import { Box, Typography } from '@mui/material'
import {
    GridActionsCellItem,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid'
import Image from 'next/image'

export const columnData = (
    handleClickOpen: (id: number) => void,
    handleUpdate: (id: string) => void,
    roles: string
): GridColDef[] => {
    // Define all columns
    const columns: GridColDef[] = [
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 150,
        //     cellClassName: 'actions',
        //     renderCell: (params: GridRenderCellParams) => (
        //         <Box
        //             display="flex"
        //             flexDirection="row"
        //             alignItems={'center'}
        //             justifyContent={'center'}
        //             gap={2}
        //         >
        //             <div onClick={() => handleUpdate(params.row.StudentID)}>
        //                 <GridActionsCellItem
        //                     sx={{
        //                         boxShadow: 3,
        //                         borderRadius: 1,
        //                         padding: '5px',
        //                     }}
        //                     key={'edit'}
        //                     icon={
        //                         <Image
        //                             src="/icon/icon-edit.svg"
        //                             alt="edit icon"
        //                             width={18}
        //                             height={18}
        //                         />
        //                     }
        //                     label="edit"
        //                 />
        //             </div>
        //             <GridActionsCellItem
        //                 sx={{ boxShadow: 3, borderRadius: 1, padding: '5px' }}
        //                 key={'delete'}
        //                 icon={
        //                     <Image
        //                         src="/icon/icon-delete.svg"
        //                         alt="delete icon"
        //                         width={18}
        //                         height={18}
        //                     />
        //                 }
        //                 label="Delete"
        //                 onClick={() =>
        //                     handleClickOpen(Number(params.row.StudentID))
        //                 }
        //             />
        //         </Box>
        //     ),
        // },
        {
            // base on your types
            field: 'name',
            // what you want to display for table
            headerName: 'Full Name',
            width: 150,
        },
        {
            field: 'gender',
            headerName: 'Sex',
            width: 100,
        },
        {
            field: 'class_id',
            headerName: 'Class',
            width: 100,
        },
        {
            field: 'place_of_birth',
            headerName: 'Place & Date of Birth',
            width: 180,
            renderCell: (params: GridRenderCellParams) => (
                <div>{params.row.place_of_birth}, {params.row.date_of_birth}</div>
            ),
        },
        {
            field: 'religion',
            headerName: 'Religion',
            width: 200,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 200,
        },
        {
            field: 'number_phone',
            headerName: 'Number Phone',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },      
        {
            field: 'accepted_date',
            headerName: 'Accepted Date',
            width: 150,
        },
        {
            field: 'school_origin',
            headerName: 'School Origin',
            width: 120,
        },
        {
            field: 'father_name',
            headerName: "Father's Name",
            width: 150,
        },
        {
            field: 'father_job',
            headerName: "Father's Job",
            width: 150,
        },
        {
            field: 'father_number_phone',
            headerName: "Father's Phone Number",
            width: 180,
        },
        {
            field: 'mother_name',
            headerName: "Mother's Name",
            width: 150,
        },
        {
            field: 'mother_job',
            headerName: "Mother's Job",
            width: 150,
        },
        {
            field: 'mother_number_phone',
            headerName: "Mother's Phone Number",
            width: 180,
        },
    ]

    if (roles === 'teacher') {
        // Remove 'actions' column and potentially others (e.g., parent-related fields)
        return columns.filter(
            (col) =>
                col.field !== 'actions' &&
                !col.field.startsWith('father_') &&
                !col.field.startsWith('mother_') &&
                col.field !== 'accepted_date' &&
                col.field !== 'school_origin'&&
                col.field !== 'accepted_date'
        )
    }

    return columns
}
