import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import querystring from 'querystring';
import CalendarArtistCard from '../components/CalendarArtistCard/CalendarArtistsCard';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
  color: ${props => props.theme.color.white};
  min-height: calc(100vh - 50px);
  padding: 1rem;
`;

const Calendar = ({ calendar }) => {
  return (
    <Container>
      <Head>
        <title>EventSpotter - Calendar</title>
      </Head>
      {calendar.map(artistEvents => {
        return <CalendarArtistCard {...artistEvents} />;
      })}
    </Container>
  );
};

Calendar.getInitialProps = async ({ req, err, query }) => {
  if (err) console.log('server error', err);
  console.log('QUERY', req && req.query, query);
  const artistList = (req && req.query) || query;
  console.log('ARTIST LIST', artistList);
  const encodedArtists = querystring.encode(artistList);
  console.log('ENCODED ARTIST', encodedArtists);
  const resp = await fetch(
    `http://localhost:3000/api/calendar/generate_calendar?${encodedArtists}`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );

  console.log('resp 🐷', resp.status);
  const { data = [] } = await resp.json();
  // Todo: trycatch, statuscode
  return { calendar: data };
};

export default Calendar;
