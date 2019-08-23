// import ReactTable from 'react-table';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { getCookieFromCookies } from '../utils/format';
import Sidebar from '../components/MusicLibrary/MusicSidebar';
import ReactTable from '../components/MusicLibrary/LibraryTable';
import HttpClient from '../utils/HttpClient';
import Router from 'next/router';

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

function LibraryPage({ data, filterBy }) {
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
  const { filterBy = 'all' } = query;
  const token = getCookieFromCookies(req ? req.headers.cookie : document.cookie, 'userInfo');
  if (!token) {
    if (!res) {
      Router.push(`/error?code=401`);
      return { data: [], filterBy };
    }
    return res.redirect(`/error?code=401`);
  }

  const resp = await HttpClient.request(`/api/library/${filterBy}`, token, res);
  const { data = [] } = resp;
  return { data, filterBy };
};

export default LibraryPage;
