import { Table, Row, Col } from 'react-bootstrap'

import Pagination from 'Components/Utils/Pagination'

function TablePagination({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  rowSpanHeaders,
  paginationProps
}: any) {
  return (
    <Row className="mt-3">
      <Col>
        <Table {...getTableProps()} className="mt-4" responsive="md">
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => {
                  if (column.id === 'actions') column.disableSortBy = true

                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      &nbsp;&nbsp;
                      {column.id !== 'actions' ? (
                        column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fas fa-sort-down"></i>
                          ) : (
                            <i className="fas fa-sort-up"></i>
                          )
                        ) : (
                          <i className="fas fa-sort"></i>
                        )
                      ) : (
                        ''
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {                   
                    return (
                      <td rowSpan={cell.rowSpan || 1} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Pagination {...paginationProps}></Pagination>
      </Col>
    </Row>
  )
}

export { TablePagination }

export default TablePagination
