import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';
import querystring from 'querystring';
import CalendarArtistCard from '../components/CalendarArtistCard/CalendarArtistsCard';
import HttpClient from '../HttpClient';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
  color: ${props => props.theme.color.white};
  min-height: calc(100vh - 50px);
  padding: 1rem;
`;

const Calendar = ({ calendar, error }) => {
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
  const encodedArtists = querystring.encode(artistList);

  try {
    const resp = await HttpClient.request(`/api/calendar/generate_calendar?${encodedArtists}`);
    const { data } = resp;
    return { calendar: data };
  } catch (error) {
    if (res) {
      res.writeHead(error.message, {
        Location: `/error?code=${error.message}`
      });
      res.end();
    } else {
      Router.push(`/error?code=${error.message}`);
    }
  }
};

export default Calendar;
