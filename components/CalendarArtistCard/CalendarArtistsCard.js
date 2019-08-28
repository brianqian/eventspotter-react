import { useState } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${props => props.theme.tailwind.gray1};
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: ${props => props.theme.color.background};
  border-bottom: 6px solid white;
`;

const ArtistName = styled.h2`
  font-size: 40px;
`;

const EventCardsContainer = styled.div`
  max-height: ${props => (props.open ? 5000 : 0)}px;
  overflow: hidden;
  transition: 0.25s;
`;

function CalendarArtistsCard({ name, events }) {
  console.log('IN CALENDAR ARTISTS CARD', events, events[0]);
  const [isOpen, setIsOpen] = useState(false);
  let message = '';
  if (events.length) message = isOpen ? 'Hide Details' : 'Show Details';
  return (
    <Container>
      <TitleBar>
        <ArtistName>{name}</ArtistName>
        <span onClick={() => setIsOpen(!isOpen)}>
          {`${events.length} events found.`}
          {message}
        </span>
      </TitleBar>
      <EventCardsContainer open={isOpen}>
        {events.map(event => {
          return <EventCard {...event} key={event.id} />;
        })}
      </EventCardsContainer>
    </Container>
  );
}

export default CalendarArtistsCard;
