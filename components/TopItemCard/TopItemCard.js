import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HttpClient from '../../utils/HttpClient';
import EventModal from './Modal/EventModal';
import useModal from '../../utils/hooks/useModal';
import { capitalizeWord } from '../../utils/format';

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
  transform: ${(props) => (props.forced ? 'translateY(0)' : 'translateY(100px)')};
  background-color: ${(props) => props.theme.changeOpacity(props.theme.tailwind.gray1, 80)};
  z-index: 5;
  transition: 0.2s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  background-clip: padding-box;
  text-align: center;
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
  height: 200px;
  width: 200px;
  object-fit: cover;
  opacity: 0.9;
  background-color: ${(props) => props.theme.color.library};
  transition: opacity 0.2s linear;
  ${Container}:hover & {
    opacity: 0.3;
  }
`;

function TopArtistCard({
  artist,
  img,
  index,
  text,
  token,
  artistID,
  generalSettings,
  locationSettings,
  analytics,
}) {
  const [showModal, toggleModal] = useModal(false);
  const [eventData, setEventData] = useState([]);
  const [sidebarData, setSidebarData] = useState([]);

  const artistHasEvents = eventData.length;

  useEffect(() => {
    let isMounted = true;
    const fetchEventData = async () => {
      // GET EVENTS FOR ARTISTS -- ALWAYS FIRES
      if (!artist) return;
      const encodedArtist = encodeURIComponent(artist);
      const { data: events = [] } = await HttpClient.request(
        `/api/events/artist/${encodedArtist}`,
        token
      );
      if (isMounted) setEventData(events);
      // ONLY FIRE IF TOP ARTIST. OTHERWISE DISPLAY SONG ANALYTICS
      // else -- set analytics to sidebar data
    };
    const fetchSidebarData = async () => {
      if (analytics) {
        const formattedSidebarData = Object.entries(analytics).map((analytic) => {
          analytic[0] = capitalizeWord(analytic[0]);
          return analytic.join(' - ');
        });
        setSidebarData(formattedSidebarData);
      } else {
        const { data: tracks = [] } = await HttpClient.request(
          `/api/library/top_tracks/${artistID}`,
          token
        );
        if (isMounted) setSidebarData(tracks.map((track) => track.name));
      }
    };

    fetchEventData();
    fetchSidebarData();

    return () => (isMounted = false);
  }, [artist, img, index, text, token, artistID]);

  // if "onlyArtistsWithEvents" enabled and artistHasEvents

  return (
    <>
      <Container data-number={index + 1} className={artistHasEvents ? 'selected' : null}>
        <TopOverlay forced={generalSettings.alwaysShowOverlay}>
          <Ranking>{index + 1}</Ranking>
          <ArtistName>
            <p>{artist}</p>
          </ArtistName>
        </TopOverlay>
        <BackgroundImage src={img} />
        <CenterOverlay forced={generalSettings.alwaysShowOverlay}>
          <MoreInfo onClick={toggleModal}>
            <img src="/static/icons/list.svg" height="25px" alt="" />
          </MoreInfo>
        </CenterOverlay>
        <BottomOverlay>{text || `${eventData.length} events found`}</BottomOverlay>
      </Container>

      {/** ***************************** */}

      <EventModal
        eventData={eventData}
        sidebarData={sidebarData}
        type={analytics ? 'analytic' : 'artist'}
        artist={analytics ? `${artist} - ${text}` : artist}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </>
  );
}

export default TopArtistCard;
