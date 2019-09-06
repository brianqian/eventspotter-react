import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useModal from '../../utils/hooks/useModal';
import HttpClient from '../../utils/HttpClient';
import Modal from '../Modal/Modal';
import { format } from 'date-fns';
import CollapseIcon from '../Icons/CollapseIcon';
import ExpandIcon from '../Icons/ExpandIcon';

const Container = styled.div`
  height: 100%;
  max-height: 200px;
  width: 100%;
  max-width: 200px;
  background-color: ${(props) => props.theme.tailwind.gray8};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  box-shadow: -10px 7px 6px rgba(0, 0, 0, 0.3);
  &.selected {
    border: 3px solid ${(props) => props.theme.color.green};
  }
`;

// Overlay
const BottomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  transform: translateY(100px);
  background-color: ${(props) => props.theme.changeOpacity(props.theme.tailwind.gray1, 80)};
  z-index: 5;
  transition: 0.2s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  background-clip: padding-box;
  box-shadow: 0px -4px 11px rgba(0, 0, 0, 0.4);
  ${Container}:hover & {
    transform: translate(0);
  }
`;

const TopOverlay = styled(BottomOverlay)`
  bottom: initial;
  top: 0;
  transform: translateY(-100px);
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.4);
`;

const CenterOverlay = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.25s ease-in;
  overflow: hidden;
  z-index: 5;
  user-select: none;
  div {
    margin: 0 2rem;
  }
  ${Container}:hover & {
    opacity: 1;
  }
`;

const MoreInfo = styled.div`
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  opacity: 0.25;
  :hover {
    opacity: 1;
  }
`;

const Ranking = styled.div`
  background-color: ${(props) => props.theme.color.green};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  opacity: 1;
`;
const ArtistName = styled.div`
  width: 170px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    padding: 0 0.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

// Background

const BackgroundImage = styled.img`
  /* height: 100%; */
  height: 200px;
  /* width: 100%; */
  width: 200px;
  object-fit: cover;
  opacity: 0.9;
  background-color: ${(props) => props.theme.color.library};
  transition: opacity 0.2s linear;
  ${Container}:hover & {
    opacity: 0.3;
  }
`;
const ModalBody = styled.section`
  display: flex;
`;

const ModalSection = styled.div`
  /* flex: 1; */
  width: ${(props) => props.width};
  max-height: 80%;

  section {
    max-height: 100%;
    overflow: auto;
  }
`;

const ModalRow = styled.div`
  display: flex;
  margin: 0.25rem 0;

  div {
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

function TopArtistCard({ artist, img, index, text, token, artistID }) {
  const [eventData, setEventData] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [showModal, toggleModal] = useModal(false);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!artist) return;
      const encodedArtist = encodeURIComponent(artist);
      const { data: events = [] } = await HttpClient.request(
        `/api/events/artist/${encodedArtist}`,
        token
      );
      if (isMounted) setEventData(events);
      // If calculating top_artist, retrieve top songs
      if (artistID) {
        const { data: tracks = [] } = await HttpClient.request(
          `/api/library/top_tracks/${artistID}`,
          token
        );
        if (isMounted) setTopTracks(tracks);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [artist, img, index, text, token, artistID]);
  // modal contains top tracks for artist
  // upcoming events
  // audio statistics if (song)
  return (
    <>
      <Container data-number={index + 1} className={eventData.length ? 'selected' : null}>
        <TopOverlay>
          <Ranking>{index + 1}</Ranking>
          <ArtistName>
            <p>{artist}</p>
          </ArtistName>
        </TopOverlay>
        <BackgroundImage src={img} />
        <CenterOverlay>
          <MoreInfo onClick={toggleModal}>
            <img src="/static/icons/list.svg" height="25px" alt="" />
          </MoreInfo>
        </CenterOverlay>
        <BottomOverlay>{text || `${eventData.length} events found`}</BottomOverlay>
      </Container>

      <Modal isShowing={showModal} hide={toggleModal} height="70vh" width="80vh">
        <h1>{artist}</h1>
        <ModalBody>
          <ModalSection width="30%">
            <header>
              <h3>Top Tracks</h3>
            </header>
            <section>
              {topTracks.map((track, i) => (
                <p key={track.name}>{`${i + 1}. ${track.name}`}</p>
              ))}
            </section>
          </ModalSection>
          <ModalSection width="70%">
            <header>
              <h3>Upcoming Events</h3>
            </header>
            <section>
              {eventData.map((event) => (
                <ModalRow key={event.id}>
                  <div className="modal_icon">$</div>
                  <div className="modal_title">{event.title}</div>
                  <div className="modal_date">{format(event.date, 'MM/DD/YY')}</div>
                  <div className="modal_location">
                    {event.location.city}, {event.location.state}
                  </div>
                  <div className="modal_icon">
                    <ExpandIcon color="#fff" height="15" />
                  </div>
                </ModalRow>
              ))}
            </section>
          </ModalSection>
        </ModalBody>
      </Modal>
    </>
  );
}

export default TopArtistCard;
