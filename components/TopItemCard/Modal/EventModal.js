import styled from 'styled-components';
import Modal from '../../Modal/Modal';
import EventCard from './EventCard';

const ModalBody = styled.section`
  display: flex;
`;

const ModalSection = styled.div`
  width: ${(props) => props.width};
  max-height: 80%;
`;

function EventModal({ eventData, sidebarData, type, artist, showModal, toggleModal }) {
  const isArtistView = type === 'artist';

  return (
    <Modal isShowing={showModal} hide={toggleModal} height="70vh" width="80vw">
      <h1>{artist}</h1>
      <ModalBody>
        <ModalSection width="30%">
          <header>
            <h3>{isArtistView ? 'Top Tracks' : 'Audio Analytics'}</h3>
          </header>
          <section>
            {sidebarData.map((item, i) => (
              <p key={item}>
                <span>{isArtistView && `${i + 1}. `}</span>
                {item}
              </p>
            ))}
          </section>
        </ModalSection>
        <ModalSection width="70%">
          <header>
            <h3>Upcoming Events</h3>
          </header>
          <section>
            {eventData.map(({ id, ...data }) => (
              <EventCard key={id} data={data} />
            ))}
          </section>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
}

export default EventModal;
