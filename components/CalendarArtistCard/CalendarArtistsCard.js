import styled from 'styled-components';
import EventCard from './EventCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h2`
  text-align: right;
  border-bottom: 6px solid white;
  font-size: 40px;
  position: relative;
`;

const observer = new IntersectionObserver({});

function CalendarArtistsCard({ name, events }) {
  console.log('IN CALENDAR ARTISTS CARD', events);
  return (
    <Container>
      <Title>{name}</Title>
      {!events.length && <p>No events Found</p>}
      {events.map(event => {
        return <EventCard {...event} />;
      })}
    </Container>
  );
}

export default CalendarArtistsCard;
