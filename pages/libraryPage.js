// import ReactTable from 'react-table';
import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';
import Sidebar from '../components/MusicLibrary/MusicSidebar';
import ReactTable from '../components/MusicLibrary/LibraryTable';
import HttpClient from '../HttpClient';

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
  return (
    <Container>
      <Head>
        <title>EventSpotter - Library</title>
      </Head>
      <MainDisplay>
        <ReactTable library={data} filterBy={filterBy} />
      </MainDisplay>
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ req, err, res, query }) => {
  if (err) console.log('server error', err);
  const cookie = req ? req.headers.cookie : document.cookie;
  const { filterBy = 'all' } = query;

  const resp = await HttpClient.request(
    `/api/library/${filterBy}`,
    { cookie, Accept: 'application/json' },
    res
  );
  const { data } = resp;
  return { data, filterBy };
};

export default LibraryPage;
