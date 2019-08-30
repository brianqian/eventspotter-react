import Router, { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { getCookieFromCookies } from '../utils/format';
import HttpClient from '../utils/HttpClient';
import ContextMenu from '../components/ContextMenu/ContextMenu';

const Container = styled.div`
  display: flex;
`;

const MainDisplay = styled.main`
  flex: 10;
  overflow: auto;
`;

function TopPages({ data }) {
  const router = useRouter();
  const { filterBy } = router.query;

  return (
    <Container>
      <Head>
        <title>Top {filterBy}</title>
      </Head>
      <MainDisplay>
        <ContextMenu />
        IM THE TOP PAGES. filterby: {filterBy}
      </MainDisplay>
    </Container>
  );
}

TopPages.getInitialProps = async ({ req, err, res, query }) => {
  if (err) console.log('server error', err);
  const { filterBy } = query;
  const token = getCookieFromCookies(req ? req.headers.cookie : document.cookie, 'userInfo');
  if (!token) {
    if (!res) {
      Router.push(`/error?code=401`);
      return { data: [], filterBy };
    }
    return res.redirect(`/error?code=401`);
  }
  console.log('🐷 TOP PAGES GIP', filterBy);
  // const resp = await HttpClient.request(`/api/library/${filterBy}`, token, res);
  const data = [];
  // const { data = [] } = resp;
  return { data };
};

export default TopPages;
