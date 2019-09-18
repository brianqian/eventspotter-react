/* eslint-disable react/jsx-one-expression-per-line */
import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border-bottom: 2px solid ${(props) => props.theme.color.white};

  p {
    padding: 0.3rem 0;
    font-weight: 700;
  }
  a {
    font-size: 24px;
  }
  span {
    font-weight: 400;
    margin-left: 4px;
  }
`;

function EventCard({ shortTitle, url, lowPrice, averagePrice, date, dateUTC, location }) {
  return (
    <Container>
      <a href={url} target="__blank">
        {shortTitle}
      </a>
      <p>
        Low Price (incl. fees):
        <span>${lowPrice}</span>
      </p>
      <p>
        Average Price (incl. fees):
        <span>${averagePrice}</span>
      </p>
      <p>
        Time:
        <span>{format(date, 'h:mm A')}</span>
      </p>
      <p>
        Date:
        <span>{format(date, 'ddd, MMM D YYYY')}</span>
      </p>
      <p>
        Location:
        <span>{`${location.city}, ${location.state}`}</span>
      </p>
      {/* <p>
        UTC time:
        <span>{format(dateUTC, 'MM-DD-YYYY')}</span>
      </p> */}
    </Container>
  );
}

export default EventCard;
