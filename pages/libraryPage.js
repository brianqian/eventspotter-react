import React from 'react';
import styled from 'styled-components';
import Library from '../components/MusicLibrary/MusicLibrary';
import Sidebar from '../components/MusicLibrary/MusicSidebar';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: calc(100vh - 50px);
`;

const StyledLibrary = styled(Library)`
  grid-column: 3/13;
  max-height: 100vh;
  overflow: auto;
`;

const StyledSidebar = styled(Sidebar)`
  grid-column: 1/3;
  border: 1px solid white;
  height: 100%;
`;

const columns = [
  { name: 'Title', width: 2, spotifyRef: 'title' },
  { name: 'Artist', width: 2, spotifyRef: 'artists' },
  { name: 'Date Added', width: 1, spotifyRef: 'added_at' },
];

function LibraryPage({ library, err }) {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary library={library || []} columns={columns} onError={err} />
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ res, req, err, query }) => {
  err && console.log('server error', err);
  const cookie = (req && req.headers.cookie) || document.cookie;
  let library = await fetch('http://localhost:3000/api/library/all', {
    credentials: 'include',
    headers: { cookie },
  });
  library = await library.json();
  console.log('CLIENT SIDE LIB', library, '*********END');
  return { library: library.data };
};

export default LibraryPage;
