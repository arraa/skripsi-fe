import { Box, Typography } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';


export const columnData = (
  handleUpdate: (id: string) => void
): GridColDef[] => [
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 150,
    cellClassName: 'actions',
    renderCell: (params: GridRenderCellParams) => (
      <Box
        display="flex"
        flexDirection="row"
        alignItems={'center'}
        justifyContent={'center'}
        gap={2}
      >
        <div onClick={ () => handleUpdate(params.row.StudentID)}>
          <GridActionsCellItem
            sx={{ boxShadow: 3, borderRadius: 1, padding: '5px' }}
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
    ),
  },
  {
    // base on your types
    field: 'name',
    headerName: 'Class Name',
    width: 300,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>  {params.row.Grade?.grade}{params.value} </Typography>
    )
  },
  {
    field: 'id_teacher',
    headerName: 'Teacher',
    width: 300,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>  {params.row.Teacher?.User.name}{params.value} </Typography>
    )
  },
];
