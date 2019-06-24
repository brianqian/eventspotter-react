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

const columns = [
  { name: 'Title', width: 2, spotifyRef: 'title' },
  { name: 'Artist', width: 2, spotifyRef: 'artists' },
  { name: 'Date Added', width: 1, spotifyRef: 'added_at' },
];

function LibraryPage({ data }) {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary library={data || []} columns={columns} />
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ res, req, err }) => {
  err && console.log('server error', err);
  try {
    const accessToken = req ? req.cookies.accessToken : fetchCookie(document.cookie, 'accessToken');
    console.log('LIBRARY, getInitialProps', accessToken);
    const SONGS_TO_QUERY = 50;
    const data = await spotifyFetch(`/me/tracks?limit=${SONGS_TO_QUERY}`, accessToken);
    console.log(data);
    if (data.error) {
      console.log(`spotify error detected: ${data.error}`);
      if (res) {
        res.redirect('/login');
        res.end();
      } else {
        console.log('error detected, pushing to login');
        Router.push('/login');
      }
    } else {
      return { data: data.items };
    }
  } catch (e) {
    throw e;
  }
};

export default LibraryPage;
