import styled from 'styled-components';
import TitleRow from './MusicLibraryTitle';
import Row from './MusicLibraryRow';
import useFetch from '../../utils/hooks/useFetch';
import BasicError from '../error';

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

function MusicLibrary({ className, library, columns, onError }) {
  const { library: spotifyLibrary, setLibrary } = useFetch(library);

  return (
    <Container className={className}>
      <StyledTitleRow widths={{}} columns={columns} />
      {onError && <BasicError message={onError} />}
      {spotifyLibrary &&
        spotifyLibrary.map(song => <Row key={song.id} data={song} columns={columns} />)}
      <button type="button" onClick={() => setLibrary(spotifyLibrary.length)}>
        Load more songs
      </button>
    </Container>
  );
}

export default MusicLibrary;
