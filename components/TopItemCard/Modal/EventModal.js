import { useMemo } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import Modal from '../../Modal/Modal';
import ExpandCollapse from '../../Icons/ExpandCollapseIcon';
import useToggleMap from '../../../utils/hooks/useToggleMap';

const ModalBody = styled.section`
  display: flex;
`;

const ModalSection = styled.div`
  width: ${(props) => props.width};
  max-height: 80%;

  section {
    max-height: 100%;
    overflow: auto;
    p {
      margin: 0.33rem 0;
    }
  }
`;

const ModalEventRow = styled.div`
  display: flex;
  margin: 0.25rem 0;
  font-size: 18px;
  height: ${(props) => (props.isOpen ? '80px' : '')};
  > * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .modal_icon {
    flex: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal_title {
    flex: 5;
  }
  .modal_date {
    flex: 1;
  }
  .modal_location {
    flex: 1.5;
  }
`;

function EventModal({ eventData, sidebarData, type, artist, showModal, toggleModal }) {
  const isArtistView = type === 'artist';
  const memoEventData = useMemo(() => eventData.map(({ id }) => id), [eventData]);
  const [toggleMap, toggleKey] = useToggleMap(memoEventData, false);

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
            {eventData.map(({ id, title, location, date, url }) => (
              <ModalEventRow key={id} isOpen={toggleMap[id]}>
                <a href={url} target="__blank" className="modal_icon">
                  $
                </a>
                <p className="modal_title">{title}</p>
                <p className="modal_date">{format(date, 'MM/DD/YY')}</p>
                <p className="modal_location">
                  {location.city},{location.state}
                </p>
                <p className="modal_icon" onClick={() => toggleKey(id)}>
                  <ExpandCollapse color="#fff" height="15" />
                </p>
              </ModalEventRow>
            ))}
          </section>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
}

export default EventModal;
