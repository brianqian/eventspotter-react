import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
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

function LibraryPage({ tracks, err }) {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary tracks={tracks} />
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ res, req, err }) => {
  const accessToken = req ? req.cookies.accessToken : fetchCookie(document.cookie, 'accessToken');
  console.log('LIBRARY, getInitialProps', accessToken);
  const SONGS_TO_QUERY = 50;
  const tracks = await spotifyFetch(`/me/tracks?limit=${SONGS_TO_QUERY}`, accessToken);
  console.log(tracks);
  if (tracks.status === 401) {
    if (res) {
      res.writeHead(401, {
        Location: '/login',
      });
      res.end();
    } else {
      Router.push('/login');
    }
  } else {
    return { err, tracks: tracks.items };
  }
};

export default LibraryPage;
