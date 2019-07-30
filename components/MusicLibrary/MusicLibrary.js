import { useState } from 'react';
import styled from 'styled-components';
import TitleRow from './MusicLibraryTitle';
import Row from './MusicLibraryRow';
import useFetch from '../../utils/hooks/useFetch';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.library};
  font-family: 'Source Sans Pro';
`;

const StyledTitleRow = styled(TitleRow)`
  margin-bottom: 1rem;
`;

function MusicLibrary({ className, library, columns, sortBy }) {
  console.log('IN MUSIC LIBRARY FIRST', library.length);
  // const { library: spotifyLibrary, getNextSongs } = useFetch(library);
  console.log('IN MUSIC LIBRARY', library[0]);
  columns = library.columns || columns;
  return (
    <Container className={className}>
      <>
        <StyledTitleRow widths={{}} columns={columns} />
        {library &&
          library.map(song => <Row key={song.id} data={song} columns={columns} type={sortBy} />)}
        {/* {sortBy === 'all' && (
          <button type="button" onClick={() => getNextSongs(library.length)}>
            Load more songs
          </button>
        )} */}
      </>
    </Container>
  );
}

export default MusicLibrary;
