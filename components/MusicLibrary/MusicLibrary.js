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
  const { library: spotifyLibrary, getNextSongs } = useFetch(library);
  console.log('IN MUSIC LIBRARY', spotifyLibrary[0]);
  return (
    <Container className={className}>
      <StyledTitleRow widths={{}} columns={columns} />
      {spotifyLibrary &&
        spotifyLibrary.map(song => <Row key={song.id} data={song} columns={columns} />)}
      {sortBy === 'all' && (
        <button type="button" onClick={() => getNextSongs(spotifyLibrary.length)}>
          Load more songs
        </button>
      )}
    </Container>
  );
}

export default MusicLibrary;
