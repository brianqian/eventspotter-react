import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { getCookieFromCookies } from '../utils/format';
import ReactTable from '../components/MusicLibrary/LibraryTable';
import HttpClient from '../utils/HttpClient';
import ContextMenu from '../components/ContextMenu/ContextMenu';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainDisplay = styled.main`
  overflow: auto;
`;

function LibraryPage({ data, filterBy }) {
  return (
    <Container>
      <Head>
        <title>Library</title>
      </Head>
      <ContextMenu />
      <MainDisplay>
        <ReactTable library={data} filterBy={filterBy} columns />
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
