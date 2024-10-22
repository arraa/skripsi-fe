import { Box } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


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
        <GridActionsCellItem
          sx={{ boxShadow: 3, borderRadius: 1, padding: '5px' }}
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
          onClick={() => handleClickOpen(Number(params.row.StudentID))}
        />
      </Box>
    ),
  },
  {
    field: 'id_class',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Full Name',
    width: 150,
  },
  {
    field: 'gender',
    headerName: 'Sex',
    width: 100,
  },
  {
    field: 'place_of_birth',
    headerName: 'Place & Date of Birth',
    width: 180,
  },
  {
    field: 'school_origin',
    headerName: 'Religion',
    width: 100,
  },
  {
    field: 'accepted_date',
    headerName: 'Address',
    width: 200,
  },
  {
    field: 'father_number_phone',
    headerName: 'Phone Number',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'father_job',
    headerName: 'Subject',
    width: 200,
  },
  {
    field: 'mother_name',
    headerName: 'Homeroom Teacher',
    width: 150,
  },
];
