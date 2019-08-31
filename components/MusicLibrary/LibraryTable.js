import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';
import Router from 'next/router';
import { format } from 'date-fns';
import { formatArtistsToArray } from '../../utils/format';

const Styles = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.color.white};
  min-width: 100%;
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
      :nth-child(3) {
        flex: 0.5;
      }
    }
    tr {
      display: flex;
    }
    tbody {
      display: block;
      overflow: auto;
    }
    thead {
      font-size: 22px;
      tr {
        :nth-child(2) {
          position: sticky;
          top: 0;
        }
      }
    }
  }
`;

const GenerateCalendar = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.color.green};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-family: 'Roboto Condensed', sans-serif;
  border-radius: 30px;
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span> {column.isSorted ? (column.isSortedDesc ? '🔽' : ' 🔼') : ''} </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
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
      </tbody>
    </table>
  );
}

function AllSongsLibrary({ library, filterBy }) {
  const columnIndex = {
    all: [
      {
        Header: 'All Songs',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Artist',
            accessor: 'artist',
          },
          {
            Header: 'Date Added',
            accessor: 'dateAdded',
          },
          {
            Header: 'Acousticness',
            accessor: 'acousticness',
            sortType: 'basic',
          },
        ],
      },
    ],
    top_artists: [
      {
        Header: 'Top Artists',
        columns: [
          {
            Header: '',
            accessor: '0.name',
          },
          {
            Header: '',
            accessor: '1.name',
          },
          {
            Header: '',
            accessor: '2.name',
          },
          {
            Header: '',
            accessor: '3.name',
          },
        ],
      },
    ],
  };

  let memoLibrary;
  if (filterBy === 'top_artists') {
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

    memoLibrary = React.useMemo(() => tempList);
  } else {
    memoLibrary = React.useMemo(() => library);
  }

  const columns = React.useMemo(() => columnIndex[filterBy], [filterBy]);
  // TODO: change library.length validation
  // This exists to allow for "top <audio metric>" sorting to have similar styling to all
  return (
    <Styles>
      {filterBy !== 'all' && library.length < 100 && (
        <GenerateCalendar
          onClick={() => {
            const query = formatArtistsToArray(library, filterBy);
            Router.push(
              {
                query,
                pathname: '/calendar',
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
