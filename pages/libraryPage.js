// import ReactTable from 'react-table';
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/MusicLibrary/MusicSidebar';
import useFilterView from '../utils/hooks/useFilterView';
import ReactTable from '../components/MusicLibrary/LibraryTable';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: calc(100vh - 50px);
`;

const StyledSidebar = styled(Sidebar)`
  grid-column: 1/3;
  border: 1px solid white;
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.background};
`;

const MainDisplay = styled.main`
  grid-column: 3/13;
  max-height: 100vh;
  overflow: auto;
`;

function LibraryPage({ data = [], error }) {
  const { sortBy, setSortBy, content, getArtists } = useFilterView(data);
  return (
    <Container>
      <StyledSidebar setSortBy={setSortBy} sortBy={sortBy} getArtists={getArtists} />
      <MainDisplay>
        {/* <Library library={content} columns={columns} sortBy={sortBy} /> */}
        <ReactTable library={content} sortBy={sortBy} />
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
    const { data } = await library.json();
    console.log('front end*************', data[0], data.length);
    return { data };
  } catch (error) {
    console.error('FRONT END ERROR', error);
    return { data: [] };
  }
};

export default LibraryPage;
