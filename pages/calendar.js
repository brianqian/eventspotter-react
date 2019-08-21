import styled from 'styled-components';
import Head from 'next/head';
import querystring from 'querystring';
import CalendarArtistCard from '../components/CalendarArtistCard/CalendarArtistsCard';
import HttpClient from '../utils/HttpClient';
import { getCookieFromCookies } from '../utils/format';

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

Calendar.getInitialProps = async ({ req, err, query, res }) => {
  if (err) console.log('server error', err);
  const artistList = (req && req.query) || query;
  const cookie = getCookieFromCookies(req ? req.headers.cookie : document.cookie, 'userInfo');
  const encodedArtists = querystring.encode(artistList);

  const { data } = await HttpClient.request(
    `/api/calendar/generate_calendar?${encodedArtists}`,
    cookie,
    res
  );
  return { calendar: data };
};

export default Calendar;
