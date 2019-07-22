import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { songType, columnType } from '../../types';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0;
`;

const Column = styled.div`
  flex: ${props => props.width};
`;

function MusicLibraryRow({ data, columns }) {
  return (
    <Container>
      {data && (
        <>
          <Column width={columns[0].width || 2}>{data.title}</Column>
          <Column width={columns[1].width || 2}>{data.artist}</Column>
          <Column width={columns[2].width || 1}>{format(data.dateAdded, 'YYYY-MM-DD')}</Column>
          {/* {columns &&
            columns.map(column => (
              <Column width={column.width}>{data.track[column.spotifyRef]}</Column>
            ))} */}
        </>
      )}
    </Container>
  );
}

/*

const extraColumns = {
  danceability: {
    width: 3,
    value: 12
  }
  tempo: 11,
  loudness: 23
}


*/

export default MusicLibraryRow;
