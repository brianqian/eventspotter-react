import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import TitleRow from './MusicLibraryTitle';
import Row from './MusicLibraryRow';
import useLibrary from '../../utils/hooks/useLibrary';

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
  console.log(library[0]);
  const [spotifyLibrary, setLibrary] = useLibrary(library);
  return (
    <Container className={className}>
      <StyledTitleRow widths={{}} columns={columns} />
      {onError && (
        <div>
          <p>{onError.message}</p>
          <p>
            Click
            {' '}
            <Link href="/api/auth/login">
              <a>Here</a>
            </Link>
            to resync your Spotify account.
          </p>
        </div>
      )}
      {spotifyLibrary &&
        spotifyLibrary.map(song => <Row key={song.id} data={song} columns={columns} />)}
      <button type="button" onClick={() => setLibrary(spotifyLibrary.length)}>
        Load more songs
      </button>
    </Container>
  );
}

export default MusicLibrary;
