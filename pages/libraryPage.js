import React, { useState } from 'react';
import styled from 'styled-components';
import Library from '../components/MusicLibrary/MusicLibrary';
import Sidebar from '../components/MusicLibrary/MusicSidebar';
import useFilterView from '../utils/hooks/useFilterView';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: calc(100vh - 50px);
`;

const StyledSidebar = styled(Sidebar)`
  grid-column: 1/3;
  border: 1px solid white;
  height: 100%;
`;
const MainDisplay = styled.main`
  grid-column: 3/13;
  max-height: 100vh;
  overflow: auto;
`;

function LibraryPage({ data, error, columns }) {
  const { sortBy, setSortBy, content } = useFilterView(data);
  return (
    <Container>
      <StyledSidebar setSortBy={setSortBy} />
      <MainDisplay>
        <Library library={content} columns={columns} sortBy={sortBy} />
      </MainDisplay>
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ req, err }) => {
  if (err) console.log('server error', err);
  const cookie = (req && req.headers.cookie) || document.cookie;
  try {
    const library = await fetch(`http://localhost:3000/api/library/all`, {
      credentials: 'include',
      headers: { cookie }
    });
    const { data, columns } = await library.json();
    console.log('front end*************', data[0], data.length);
    return { data, columns };
  } catch (error) {
    console.error('FRONT END ERROR', error);
    return { data: [] };
  }
};

LibraryPage.defaultProps = {
  data: []
};

export default LibraryPage;
