import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
`;

const Calendar = () => {
  return <Container>Hello I&apos;m Calendar</Container>;
};

Calendar.getInitialProps = async ({ req, err }) => {
  if (err) console.log('server error', err);
  const cookie = (req && req.headers.cookie) || document.cookie;
  let topArtists = await fetch(`http://localhost:3000/api/library/top_artists`, {
    credentials: 'include',
    headers: { cookie }
  });
  topArtists = topArtists.json();
  console.log(topArtists);
};

export default Calendar;
