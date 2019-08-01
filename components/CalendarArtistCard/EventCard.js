/* eslint-disable react/jsx-one-expression-per-line */
import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

function EventCard({ shortTitle, url, lowPrice, averagePrice, date, dateUTC, location }) {
  console.log('EventCard', location);
  return (
    <Container>
      <p>{shortTitle}</p>
      <p>Buy{url}</p>
      <p>Low Price: {lowPrice}</p>
      <p>Average Price: {averagePrice}</p>
      <p>Local Time: {format(date, 'MM-DD-YYY')}</p>
      <p>Location: {`${location.city}, ${location.state}`}</p>
      <p>{dateUTC}</p>
      <p />
    </Container>
  );
}

export default EventCard;
