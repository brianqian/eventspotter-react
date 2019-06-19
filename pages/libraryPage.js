import React from 'react';
import styled from 'styled-components';
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

function libraryPage() {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary />
    </Container>
  );
}

export default libraryPage;
