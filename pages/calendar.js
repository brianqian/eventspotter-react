import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
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
      {calendar.map((artistEvents) => {
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
  const data = await (await fetch(
    `http://localhost:3000/api/calendar/generate_calendar?${encodedArtists}`
  )).json();

  const { calendar = [] } = data;

  return { calendar };
  // console.log('IN CALENDAR, ', query.calendar);
  // console.log('IN CALENDAR, ', res.locals);
};

export default Calendar;
