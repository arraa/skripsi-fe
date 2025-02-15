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

    const height = `h-[${maxHeight}]`  || 'h-[74vh]'

    return (
        <div className={height}>
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
                pageSizeOptions={[20, 30]}
                disableRowSelectionOnClick
                filterModel={{
                    items: [],
                    quickFilterValues: [searchValue],
                }}
                sx={{
                    backgroundColor: '#fff',
                    maxWidth: '79vw',
                    border: 'none',
                    boxShadow: 'none',
                    color: '#0C4177',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                }}
            />
        </div>
    )
}

export default Table;
