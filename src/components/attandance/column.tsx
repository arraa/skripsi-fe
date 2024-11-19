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
              sx={{ boxShadow: 3, borderRadius: 1, padding: '5px' }}
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

export const columnDataAttandanceForm = (
  status: string[],
  control: any,
  setValue: any,
  attandance: any
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
      // console.log(params);
      return (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
           <ControllerSelectField
            control={control}
            name={`reason-${params.row.id}`}
            label=""
            options={status.map((item: string) => ({
              value: item,
              label: item,
            }))}
            noDefault={true}
            value={attandance[params.row.id - 1]?.reason || 'Hadir'}
            onChange={(selectedValue: string) => {
              console.log('Selected value:', selectedValue);
          
              // Use the setValue function to update the form value for the specific row ID
              setValue(`reason-${params.row.id}`, { reason: selectedValue });
            }}
          />
        </Box>
      );
    },
  },
];
