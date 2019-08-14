// import ReactTable from 'react-table';
import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
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
  overflow: auto;
`;

function LibraryPage({ data = [], error, filterBy }) {
  if (error) Router.push(`/error?code=${error.code}`);
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
  console.log('LIB PAGE QUERY 🍐🍐🍐🍐🍐', query);
  const cookie = req ? req.headers.cookie : document.cookie;
  const { filterBy = 'all' } = query;

  const resp = await fetch(`http://localhost:3000/api/library/${filterBy}`, {
    credentials: 'include',
    headers: { cookie }
  });
  if (resp.status !== 200) return { data: [], error: { code: resp.status }, filterBy };
  const { data } = await resp.json();
  console.log('front end*************', data[0], data.length);
  return { data, filterBy };
};

export default LibraryPage;
