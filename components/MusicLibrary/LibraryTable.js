import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';
import Router from 'next/router';
import { format } from 'date-fns';
import { formatArtistsToArray } from '../../utils/format';
import Collapse from '../Icons/CollapseIcon';
import Expand from '../Icons/ExpandIcon';

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
      max-height: calc(100vh - 75px);
    }
    thead {
      font-size: 22px;
      tr {
        :nth-child(2) {
          position: sticky;
          top: 0px;
        }
      }
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
    <table {...getTableProps()}>
      <thead>
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

function AllSongsLibrary({ library }) {
  const memoLibrary = React.useMemo(() => library);

  const columns = React.useMemo(
    () => [
      {
        Header: 'All Songs',
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
          {
            Header: 'Acousticness',
            accessor: 'acousticness',
            sortType: 'basic',
          },
        ],
      },
    ],
    []
  );
  // TODO: change library.length validation
  // This exists to allow for "top <audio metric>" sorting to have similar styling to all
  return (
    <Styles>
      <Table columns={columns} data={memoLibrary} />
    </Styles>
  );
}

export default AllSongsLibrary;
