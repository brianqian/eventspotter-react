import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
  color: ${props => props.theme.color.white};
  min-height: calc(100vh - 50px);
`;

const Calendar = ({ data: topArtists, error }) => {
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
  try {
    let data = await fetch(`http://localhost:3000/api/library/top_artists`, {
      credentials: 'include',
      headers: { cookie }
    });
    data = await data.json();
    console.log('IN CALENDAR FRONT- TOP ARTISTS', data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default Calendar;
