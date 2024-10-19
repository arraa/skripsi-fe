import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface tableProps {
  data: Array<object>;
  columnData: GridColDef[];
  searchValue?: string;
}
const Table = (props: tableProps) => {
  const { data, columnData, searchValue } = props;
  return (
    <DataGrid
      rows={data}
      columns={columnData}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
      pageSizeOptions={[25, 50, 75]}
      disableRowSelectionOnClick
      filterModel={{
        items: [],
        quickFilterValues: [searchValue],
      }}
       sx={{
        maxWidth:'80vw',
        border: 'none',
        boxShadow: 'none',
        color: '#0c427770',
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default Table;
