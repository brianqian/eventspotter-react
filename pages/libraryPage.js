import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import jwt from 'jsonwebtoken';
import { spotifyFetch, fetchCookie } from '../utils/fetch';
import Library from '../components/MusicLibrary/MusicLibrary';
import Sidebar from '../components/MusicLibrary/MusicSidebar';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: 100vh;
`;

const StyledLibrary = styled(Library)`
  grid-column: 3/13;
`;

const StyledSidebar = styled(Sidebar)`
  grid-column: 1/3;
  border: 1px solid white;
`;

const columns = [
  { name: 'Title', width: 2, spotifyRef: 'title' },
  { name: 'Artist', width: 2, spotifyRef: 'artists' },
  { name: 'Date Added', width: 1, spotifyRef: 'added_at' },
];

function LibraryPage({ data, err }) {
  return (
    <Container>
      <StyledSidebar />
      <StyledLibrary library={data || []} columns={columns} onError={err} />
    </Container>
  );
}

LibraryPage.getInitialProps = async ({ res, req, err, query }) => {
  console.log('IN LIBRARY PAGE', query);
  err && console.log('server error', err);
  const token = req ? req.cookies.userInfo : fetchCookie(document.cookie, 'userInfo');
  const { spotifyID } = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  let library = await fetch(`http://localhost:3000/library/all?id=${spotifyID}`);
  library = await library.json();

  // const accessToken = req ? req.cookies.accessToken : fetchCookie(document.cookie, 'accessToken');
  // console.log('LIBRARY, getInitialProps token', accessToken);
  // if (!accessToken) return { data: [], err: 'Access Token incorrect' };
  const SONGS_TO_QUERY = 50; //default: 20; max: 50;
  // const data = await spotifyFetch(`/me/tracks?limit=${SONGS_TO_QUERY}`, accessToken);
  // if (data.error) {
  //   //REFRESH TOKEN
  //   console.log(`spotify error detected: ${data.error}`);
  //   if (res) {
  //     res.writeHead(data.error.status, {
  //       Location: '/login',
  //     });
  //     res.end();
  //   } else {
  //     console.log('error detected, pushing to login');
  //     Router.push('/login');
  //   }
  // } else {
  //   return { data: data.items };
  // }
  return { data: [] };
};

export default LibraryPage;
