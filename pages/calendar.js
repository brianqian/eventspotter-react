import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
  color: ${props => props.theme.color.white};
  min-height: calc(100vh - 50px);
`;

const Calendar = ({ topArtists }) => {
  return (
    <Container>
      Hello I&apos;m Calendar
      {topArtists.map(artist => (
        <div>{artist.name}</div>
      ))}
    </Container>
  );
};

Calendar.getInitialProps = async ({ req, err }) => {
  if (err) console.log('server error', err);
  const cookie = (req && req.headers.cookie) || document.cookie;
  let topArtists = await fetch(`http://localhost:3000/api/calendar/top_artists`, {
    credentials: 'include',
    headers: { cookie }
  });
  topArtists = await topArtists.json();
  console.log('IN CALENDAR FRONT- TOP ARTISTS', topArtists);
  return topArtists;
};

export default Calendar;
