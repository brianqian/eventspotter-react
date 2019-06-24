import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Column = styled.div`
  flex: ${props => props.width};
`;

function MusicLibraryRow({ data, widths, extraColumns }) {
  console.log(data.added_at);
  return (
    <Container>
      {data && (
        <>
          <Column width={widths.name || 3}>{data.track.name}</Column>
          <Column width={widths.title || 2}>
            {data.track.artists.map(({ name }) => name).join(', ')}
          </Column>
          <Column width={widths.title || 1}>{data.added_at}</Column>
          {extraColumns &&
            Object.keys(extraColumns).map(({ column }) => (
              <Column width={column.width}>{column.value}</Column>
            ))}
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
