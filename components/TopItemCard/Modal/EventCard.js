import styled from 'styled-components';
import { format } from 'date-fns';

const Container = styled.div`
  display: flex;
  margin: 0.25rem 0;
`;

const EventName = styled.div`
  flex: 8;
  padding: 5px 10px;
`;

const TimeAndPlace = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.5;
`;

const Pricing = styled.div`
  flex: 1.5;
`;

const BuyTicketsButton = styled.button`
  padding: 4px 10px;
  background-color: ${(props) => props.theme.color.green};
  color: black;
  border: 1px solid ${(props) => props.theme.color.green};
`;

function EventCard({ data: { title, date, location } }) {
  return (
    <Container>
      <TimeAndPlace>
        <span>{format(date, 'MMM DD')}</span>
        <span>{format(date, 'h:mm aa')}</span>
      </TimeAndPlace>
      <EventName>{title}</EventName>
      <Pricing>
        <BuyTicketsButton>Buy Tickets</BuyTicketsButton>
      </Pricing>
    </Container>
  );
}

export default EventCard;
