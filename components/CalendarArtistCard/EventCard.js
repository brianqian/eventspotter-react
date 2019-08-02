/* eslint-disable react/jsx-one-expression-per-line */
import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border-bottom: 2px solid ${props => props.theme.color.white};

  p {
    padding: 0.3rem 0;
  }
  a {
    color: white;
    :visited {
      color: white;
    }
    font-size: 24px;
  }
`;

function EventCard({ shortTitle, url, lowPrice, averagePrice, date, dateUTC, location }) {
  return (
    <Container>
      <a href={url} target="__blank">
        {shortTitle}
      </a>
      <p>{`Low Price: $${lowPrice}`}</p>
      <p>{`Average Price: $${averagePrice}`}</p>
      <p>{`Local Time: ${format(date, 'MM-DD-YYYY')}`}</p>
      <p>{`Location: ${location.city}, ${location.state}`}</p>
      <p>{`UTC time: ${format(dateUTC, 'MM-DD-YYYY')}`}</p>
      <p />
    </Container>
  );
}

export default EventCard;
