import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';

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

const GenerateCalendar = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.color.green};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-family: 'Roboto Condensed', sans-serif;
  border-radius: 30px;
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

function AllSongsLibrary({ library, sortBy, formatArtistsForQuery }) {
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
            Header: '',
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
      {sortBy !== 'all' && (
        <GenerateCalendar
          onClick={() => {
            Router.push(
              {
                pathname: '/calendar',
                query: formatArtistsForQuery()
              },
              '/calendar'
            );
          }}
        >
          Generate Calendar
        </GenerateCalendar>
      )}
      <Table columns={columns} data={memoLibrary} />
    </Styles>
  );
}

export default AllSongsLibrary;
