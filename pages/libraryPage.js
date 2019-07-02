import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { spotifyFetch, fetchCookie } from '../utils/fetch';
import Library from '../components/MusicLibrary/MusicLibrary';
import Sidebar from '../components/MusicLibrary/MusicSidebar';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: calc(100vh - 50px);
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

function LibraryPage({ data, err }) {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary library={data || []} columns={columns} onError={err} />
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ res, req, err, query }) => {
  err && console.log('server error', err);
  const cookie = (req && req.headers.cookie) || document.cookie;
  let library = await fetch('http://localhost:3000/api/library/all', {
    credentials: 'include',
    headers: {
      cookie,
    },
  });
  library = await library.json();
  return { data: library.items };
};

export default LibraryPage;
