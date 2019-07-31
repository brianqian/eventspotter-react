import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.library};
  font-family: 'Source Sans Pro';

  table {
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-align: left;
    }
    thead {
      font-size: 22px;
    }
  }
`;

function Table({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}

function AllSongsLibrary({ library, sortBy }) {
  const columnIndex = {
    all: [
      {
        Header: 'All Songs',
        columns: [
          {
            Header: 'Title',
            accessor: 'title'
          },
          {
            Header: 'Artist',
            accessor: 'artist'
          },
          {
            Header: 'Date Added',
            accessor: 'dateAdded'
          }
        ]
      }
    ],
    top_artists: [
      {
        Header: 'Top Artists',
        columns: [
          {
            Header: 'Artist',
            accessor: 'name'
          }
        ]
      }
    ]
  };

  const columns = React.useMemo(() => columnIndex[sortBy], [sortBy]);
  const memoLibrary = React.useMemo(() => library);

  console.log('END OF TABLE', memoLibrary[0]);
  return (
    <Styles>
      <Table columns={columns} data={memoLibrary} />
    </Styles>
  );
}

export default AllSongsLibrary;
