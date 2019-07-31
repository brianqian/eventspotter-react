import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
  color: ${props => props.theme.color.white};
  min-height: calc(100vh - 50px);
`;

const Calendar = ({ error, calendar, artists }) => {
  console.log('IN CAL COMP FRONT', calendar);
  return (
    <Container>
      Hello I&apos;m Calendar
      {calendar.map((event, i) => {
        const current = artists[i];
        return (
          <div>
            <header>{artists[i]}</header>
            <div>
              <p>{event[current].shortTitle}</p>
              <p>{event[current].url}</p>
              <p>{event[current].lowPrice}</p>
              <p>{event[current].averagePrice}</p>
              <p>{event[current].date}</p>
              <p>{event[current].dateUTC}</p>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

Calendar.getInitialProps = async ({ req, err, query }) => {
  if (err) console.log('server error', err);
  console.log('QUERY', req && req.query, query);
  const artists = (req && req.query.artists) || query.artists;
  const encodedArtists = querystring.encode(artists);
  console.log('ENCODED ARTIST', encodedArtists);
  const data = await (await fetch(
    `http://localhost:3000/api/calendar/generate_calendar?${encodedArtists}`
  )).json();

  const { calendar } = data;
  return { calendar, artists };
  // console.log('IN CALENDAR, ', query.calendar);
  // console.log('IN CALENDAR, ', res.locals);
};

export default Calendar;
