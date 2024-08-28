import { Box } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';
import Link from 'next/link';

export const columnData: GridColDef[] = [
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
        <Link href={`/personal-data/student/update/${params.id}`}>
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
        </Link>
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
          onClick={(e) => {}}
        />
      </Box>
    ),
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
    field: 'class',
    headerName: 'Class',
    width: 100,
  },
  {
    field: 'place_of_birth',
    headerName: 'Place & Date of Birth',
    width: 180,
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
];
