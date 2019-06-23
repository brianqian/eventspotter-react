import React from 'react';
import styled from 'styled-components';
import { spotifyFetch, fetchCookie } from '../utils/fetch';
import Library from '../components/MusicLibrary/MusicLibrary';
import Sidebar from '../components/MusicLibrary/MusicSidebar';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: 100vh;
`;

const StyledLibrary = styled(Library)`
  grid-column: 3/13;
`;

const StyledSidebar = styled(Sidebar)`
  grid-column: 1/3;
  border: 1px solid white;
`;

function LibraryPage({ tracks }) {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary tracks={tracks} />
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ req }) => {
  const accessToken = req ? req.cookies.accessToken : fetchCookie(document.cookie, 'accessToken');
  // let { accessToken } = (req && req.cookies) || null;

  !req && console.log(document.cookie);
  console.log('GETINITIALPROPS', accessToken);
  const tracks = await spotifyFetch('/me/tracks', accessToken);
  console.log(tracks);
  return { tracks: tracks.items };
};

export default LibraryPage;
