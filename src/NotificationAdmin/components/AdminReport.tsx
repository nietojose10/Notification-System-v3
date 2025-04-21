import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Button, Placeholder, Row, Table } from 'react-bootstrap'
import { AdminReportInterface } from '../../interfaces/interfaces';
import { useEffect } from 'react';
import { useAdminStore } from '../../hooks';

const columnHelper = createColumnHelper<AdminReportInterface>();

const columns = [
    // columnHelper.accessor('name', {
    //     header: 'Name'
    // }),
    columnHelper.accessor( row => row.name, {
        id: 'name',
        header: () => 'Name',
        cell: info => `${info.getValue().at(0)?.toLocaleUpperCase()}${info.getValue().substring(1)}`
    }),
    columnHelper.accessor('email', {
        header: 'Email'
    }),
    columnHelper.accessor('phoneNumber', {
        header: 'Phone Number'
    }),
    columnHelper.accessor('subscribed', {
        header: 'Notification Types'
    }),
    columnHelper.accessor('channels', {
        header: 'Channels'
    }),
];

export const AdminReport = () => {

    const { getUsersInfo, users, enableAdminForm, adminFormStatus } = useAdminStore();
    const placeholderCells = Array.from({ length: 8 });

    useEffect(() => {
        getUsersInfo();
    }, []);

    const table = useReactTable({
        data: users,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    });

    const handleEnableForm = () => {
        enableAdminForm();
    }    

  return (
    <div className="ctn-admin-report"  style={{ display: (!adminFormStatus) ? 'block' : 'none'  }}>
        <div className="ctn-create-user">
            <Button className="btn-create-user" onClick={handleEnableForm}>
                Create User
            </Button>
        </div>
        {
            ( !!Object.keys(users).length )
            ?
            <div className="ctn-admin-table">
                
                <Table className="tbl-admin-report">
                    <thead>
                        {
                            table.getHeaderGroups().map( headerGroup => (
                                <tr key={headerGroup.id} >
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
                            ) )
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map( row => (
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
            </div>
            :
            <div className="ctn-table-placeholder">
                <div className="tbl-placeholder">
                    <Placeholder as="div" className="thead-placeholder" animation="wave">
                        <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" /> <Placeholder xs={2} size="lg" />
                    </Placeholder>
                    <Placeholder as="div" className="tbody-placeholder" animation="wave">
                        {
                            placeholderCells.map( ( _, index ) => (
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
