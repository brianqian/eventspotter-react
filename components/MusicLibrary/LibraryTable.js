import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import Router from 'next/router';

const Styles = styled.div`
  padding: 1rem;
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.library};
  font-family: 'Source Sans Pro';

  table {
    width: 100%;
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
            accessor: '0.name'
          },
          {
            Header: '',
            accessor: '1.name'
          },
          {
            Header: '',
            accessor: '2.name'
          },
          {
            Header: '',
            accessor: '3.name'
          }
        ]
      }
    ]
  };

  let memoLibrary;
  if (sortBy === 'top_artists') {
    const tempList = [];
    const topArtists = library;
    topArtists.forEach((artistName, i) => {
      const currentList = tempList[i % 5];
      if (currentList) {
        currentList.push(artistName);
      } else {
        tempList[i % 5] = [artistName];
      }
    });
    console.log('TOP ARTISTS IN TABLE', tempList);

    memoLibrary = React.useMemo(() => tempList);
  } else {
    memoLibrary = React.useMemo(() => library);
  }

  const columns = React.useMemo(() => columnIndex[sortBy], [sortBy]);
  // TODO: change library.length validation
  return (
    <Styles>
      {sortBy !== 'all' && library.length < 100 && (
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
