import { useEffect, useMemo, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, 
        getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useLogHistoryStore } from '../../hooks';
// import { format } from 'date-fns';
import { LogHistoryReport } from '../../interfaces/interfaces';
import { Placeholder, Table, Row, Pagination } from 'react-bootstrap';

export const MessagesReport = () => {

    const { startLoadingLogHistory, logHistory, fromLogHistoryToReport } = useLogHistoryStore();
    const placeHoldersCells = Array.from({ length: 12 });
    const [sorting, setSorting] = useState<SortingState>([]);
  
    useEffect(() => {
      startLoadingLogHistory();
    }, []);

    const columnHelper = createColumnHelper<LogHistoryReport>();

    const columns = useMemo(() => [
      columnHelper.accessor('typeMessage', {
        header: 'Message Type'
      }),
      columnHelper.accessor('channel', {
        header: 'Notification Type'
      }),
      columnHelper.accessor('creationDate', {
        header: 'Dispatch Date'
      }),
      columnHelper.accessor('userName', {
        header: 'User Name'
      }),
      columnHelper.accessor('email', {
        header: 'Email'
      }),
      columnHelper.accessor('phoneNumber', {
        header: 'Phone Number'
      })
    ]
    , []);

    const table = useReactTable({
      data: useMemo(() => fromLogHistoryToReport(logHistory), [logHistory]),
      columns,
      getCoreRowModel: useMemo(() => getCoreRowModel(), []),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting
      },
      onSortingChange: setSorting,
    });  
    
  return (
    <div className="ctn-messages-report">
      {
        ( logHistory )
        ? 
          <div>
            <Table className="custom-table">
              <thead>
                {
                  table.getHeaderGroups().map( headerGroup => (
                    <tr key={headerGroup.id}>
                      {
                        headerGroup.headers.map( header => (
                          <th key={header.id}>
                            {
                              header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              <tbody>
                {
                  table.getRowModel().rows.map( row =>(
                    <tr key={row.id}>
                      {
                        row.getVisibleCells().map( cell => (
                          <td key={cell.id}>
                            {
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            }
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <Pagination>
              <Pagination.First onClick={ () => table.setPageIndex( 0 ) } />
              <Pagination.Prev onClick={ () => table.previousPage() } />
              <Pagination.Next onClick={ () => table.nextPage() } />
              <Pagination.Last onClick={ () => table.setPageIndex( table.getPageCount() - 1 ) } />
            </Pagination>
          </div>
      :
        <div className="ctn-table-placeholder">
            <div className="tbl-placeholder">
              <Placeholder as="div" className="thead-placeholder" animation="wave">
                <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" />
              </Placeholder>

              <Placeholder as="div" className="tbody-placeholder" animation="wave">
                {
                  placeHoldersCells.map( ( _, index ) => (
                    <Row key={index}>
                      <Placeholder xs={1} size="sm" />
                      <Placeholder xs={1} size="sm" />
                      <Placeholder xs={1} size="sm" />
                      <Placeholder xs={1} size="sm" />
                      <Placeholder xs={1} size="sm" />
                    </Row>
                  ))
                }
              </Placeholder>
            </div>
        </div>
      }
    </div>
  )
}
