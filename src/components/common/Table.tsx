import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface tableProps {
    data: Array<object>;
    columnData: GridColDef[];
    searchValue?: string;
    heighRow?: number;
}
const Table = (props: tableProps) => {
    const { data, columnData, searchValue, heighRow } = props;
    return (
        <div className='h-[70vh]'>
            <DataGrid
                rowHeight={heighRow ? heighRow : undefined}
                rows={data}
                columns={columnData}
                {...data}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                            /* page: 0 // default value will be used if not passed */
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                filterModel={{
                    items: [],
                    quickFilterValues: [searchValue],
                }}
                sx={{
                    backgroundColor: '#fff',
                    maxWidth: '80vw',
                    border: 'none',
                    boxShadow: 'none',
                    color: '#0c427770',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                }}
            />
        </div>
    );
};

export default Table;
