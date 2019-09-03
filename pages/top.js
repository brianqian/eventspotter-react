import Router, { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { getCookieFromCookies } from '../utils/format';
import HttpClient from '../utils/HttpClient';
import ContextMenu from '../components/ContextMenu/ContextMenu';
import ItemCard from '../components/TopItemCard/TopItemCard';
import useChangeTopArtist from '../utils/hooks/useChangeTopArtist';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.color.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.color.white};
`;

const MainDisplay = styled.main`
  width: 100%;
  max-width: 1200px;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(auto-fill, 200px);
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
  padding: 3rem;
`;

function TopPages({ data, token }) {
  const router = useRouter();
  const { filterBy } = router.query;
  const isTopArtists = filterBy === 'artists';
  console.log(data);
  const [currentData, setTopArtistLength] = useChangeTopArtist(data);
  return (
    <Container>
      <Head>
        <title>Top {filterBy}</title>
      </Head>

      <ContextMenu token={token} setTopArtist={currentData.length ? setTopArtistLength : null} />
      <Title>{filterBy.toUpperCase()}</Title>
      <MainDisplay>
        {currentData.map((item, i) =>
          isTopArtists ? (
            <ItemCard
              key={item.id}
              artist={item.name}
              img={item.images[2].url}
              index={i}
              token={token}
              artistID={item.id}
            />
          ) : (
            <ItemCard
              key={item.song_id}
              artist={item.artist}
              text={item.title}
              img={item.album_img}
              index={i}
              token={token}
            />
          )
        )}
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
  const resp = await HttpClient.request(`/api/library/top/${filterBy}`, token, res);
  const { data = [] } = resp;
  return { data, token };
};

export default TopPages;
