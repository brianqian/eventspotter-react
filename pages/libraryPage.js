// import ReactTable from 'react-table';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../components/MusicLibrary/MusicSidebar';
import useFilterView from '../utils/hooks/useFilterView';
import ReactTable from '../components/MusicLibrary/LibraryTable';

const Container = styled.div`
  display: flex;
`;

const StyledSidebar = styled(Sidebar)`
  flex: 2;
  color: ${props => props.theme.color.white};
  width: 100%;
  background-color: ${props => props.theme.color.background};
`;

const MainDisplay = styled.main`
  flex: 10;
  /* min-height: 100vh; */
  overflow: auto;
`;

function LibraryPage({ data = [], error, filterBy }) {
  return (
    <Container>
      <Head>
        <title>EventSpotter - Library</title>
      </Head>
      {/* <StyledSidebar setFilterBy={setFilterBy} filterBy={filterBy} /> */}
      <MainDisplay>
        <ReactTable library={data} filterBy={filterBy} />
      </MainDisplay>
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ req, err, res, query }) => {
  if (err) console.log('server error', err);
  console.log('QUERY 🍐🍐🍐🍐🍐', query);
  const cookie = req ? req.headers.cookie : document.cookie;
  const { filterBy = 'all' } = query;
  try {
    const resp = await fetch(`http://localhost:3000/api/library/${filterBy}`, {
      credentials: 'include',
      headers: { cookie }
    });
    const { data } = await resp.json();
    console.log('front end*************', data[0], data.length);
    return { data, filterBy };
  } catch (error) {
    console.log('TCL: LibraryPage.getInitialProps -> error', error);
    return { data: [] };
  }
};

export default LibraryPage;
