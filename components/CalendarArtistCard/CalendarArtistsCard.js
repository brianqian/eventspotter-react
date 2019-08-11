import { useState } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

  return (
    <Container>
      <TitleBar>
        <ArtistName>{name}</ArtistName>
        <span onClick={() => setIsOpen(!isOpen)}>
          {`${events.length} events found.`}
          {events.length && (isOpen ? 'Hide Details' : 'Show Details')}
        </span>
      </TitleBar>
      <EventCardsContainer open={isOpen}>
        {events.map((event, i) => {
          return <EventCard {...event} key={event.id} />;
        })}
      </EventCardsContainer>
    </Container>
  );
}

export default CalendarArtistsCard;
