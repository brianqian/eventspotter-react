import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
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

function LibraryPage({ context }) {
  return (
    <Container>
      {context}
      poop
      <StyledSidebar />
      <StyledLibrary />
    </Container>
  );
}

LibraryPage.getInitialProps = async context => {
  const { store, isServer, query, req } = context;

  return { context };
  const res = await fetch('');
};

export default LibraryPage;
