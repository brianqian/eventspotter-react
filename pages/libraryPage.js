import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { getCookieFromCookies } from '../utils/format';
import LibraryTable from '../components/MusicLibrary/LibraryTable';
import HttpClient from '../utils/HttpClient';
import ContextMenu from '../components/ContextMenu/ContextMenu';
import { SettingsConsumer } from '../components/SettingsProvider/SettingsProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainDisplay = styled.main`
  overflow: auto;
`;

function LibraryPage({ data, filterBy }) {
  // LibraryPage needs it's own hook that controls the view of the current available columns.
  // this hook should be informed by UserSettings and pass the controls to ContextMenu Component
  return (
    <Container>
      <Head>
        <title>Library</title>
      </Head>
      <ContextMenu />
      <MainDisplay>
        <SettingsConsumer>
          {({ state: { columns } }) => (
            <LibraryTable library={data} filterBy={filterBy} columns={columns} />
          )}
        </SettingsConsumer>
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
  // make a fetch request for column settings
  const resp = await HttpClient.request(`/api/library/${filterBy}`, token, res);
  const { data = [] } = resp;
  return { data, filterBy };
};

export default LibraryPage;
