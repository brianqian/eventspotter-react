/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';
import { format } from 'date-fns';
import columnLibrary from './ColumnLibrary';
import Collapse from '../Icons/CollapseIcon';
import Expand from '../Icons/ExpandIcon';
import { SettingsConsumer } from '../SettingsProvider/SettingsProvider';

const Styles = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.color.white};
  min-width: 100vw;
  width: auto;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.library};
  font-family: 'Source Sans Pro';

  table {
    min-width: 100%;
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-align: left;
      flex: 1;
    }
    tr {
      display: flex;
    }
    /* tbody {
      display: block;
      overflow: auto;
      max-height: calc(100vh - 75px);
    } */
  }
`;

const TableContainer = styled.table`
  min-width: 100vw;
  width: auto;
`;

const TableHead = styled.thead`
  font-size: 22px;
  tr {
    display: flex;
    :nth-child(2) {
      position: sticky;
      top: 0px;
    }
  }
  th {
    flex: 1;
  }
`;

const TableBody = styled.tbody`
  display: block;
  overflow: auto;
  max-height: calc(100vh - 75px);
  tr {
    :hover {
      background-color: ${(props) => props.theme.changeOpacity(props.theme.tailwind.green1, 10)};
    }
  }
`;

function Table({ columns, data }) {
  console.log('DATA IN TABLE', data[0], data.length);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  return (
    <TableContainer {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {' '}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <Expand color="#fff" height="15" />
                    ) : (
                      <Collapse color="#fff" height="15" />
                    )
                  ) : (
                    ''
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </TableHead>
      <TableBody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id === 'dateAdded') {
                    cell.value = format(cell.value, 'MM-DD-YYYY');
                  }
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            )
        )}
      </TableBody>
    </TableContainer>
  );
}

function AllSongsLibrary({ library, columns }) {
  const columnsToRender = [
    {
      Header: 'Library',
      columns: [
        {
          Header: 'Title',
          accessor: 'title',
          sortType: 'basic',
        },
        {
          Header: 'Artist',
          accessor: 'artist',
          sortType: 'basic',
        },
        {
          Header: 'Date Added',
          accessor: 'dateAdded',
        },
      ],
    },
  ];
  Object.keys(columns).forEach((analytic) => {
    if (columns[analytic]) columnsToRender[0].columns.push(columnLibrary[analytic]);
  });

  const renderedColumns = React.useMemo(() => columnsToRender, [columnsToRender]);
  const memoLibrary = React.useMemo(() => library, [library]);
  console.log('table is rerendering');
  return (
    <Styles>
      <Table columns={renderedColumns} data={memoLibrary} />
    </Styles>
  );
}

export default AllSongsLibrary;
