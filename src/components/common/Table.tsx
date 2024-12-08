import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TableProps {
    data: Array<object>;
    columnData: GridColDef[];
    searchValue?: string;
    heighRow?: number;
    maxHeight?: string
}
const Table = (props: TableProps) => {
    const { data, columnData, searchValue, heighRow, maxHeight } = props

    const height = maxHeight  || '74vh'

    return (
        <div className={`h-[${height}]`}>
            <DataGrid
                rowHeight={heighRow || undefined}
                rows={data}
                columns={columnData}
                {...data}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
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
                    maxWidth: '76vw',
                    border: 'none',
                    boxShadow: 'none',
                    color: '#0c427770',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                }}
            />
        </div>
    )
}

export default Table;
