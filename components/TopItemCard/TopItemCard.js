import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useModal from '../../utils/hooks/useModal';
import HttpClient from '../../utils/HttpClient';

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
  /* &::after {
    content: attr(data-number);
    color: ${(props) => props.theme.color.green};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.7;
    transition: 0.25s;
    :hover {
      opacity: 0.3;
    }
  } */
  &.selected {
    border: 3px solid ${(props) => props.theme.color.green};
  }
`;

const Modal = styled.div`
  overflow: hidden;
  position: absolute;
  color: white;
  height: 70vh;
  width: 50vw;
  display: ${(props) => (props.showing ? 'block' : 'none')};
`;

const BottomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  transform: translateY(100px);
  background-color: ${(props) => props.theme.changeOpacity(props.theme.tailwind.gray1, 75)};
  z-index: 5;
  transition: 0.2s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  background-clip: padding-box;
  ${Container}:hover & {
    transform: translate(0);
  }
`;

const TopOverlay = styled(BottomOverlay)`
  bottom: initial;
  top: 0;
  transform: translateY(-100px);
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
  width: 140px;
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

const OpenModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
`;

const BackgroundImage = styled.img`
  height: 100%;
  max-height: 200px;
  width: 100%;
  max-width: 200px;
  object-fit: cover;
  opacity: 0.9;
  background-color: ${(props) => props.theme.tailwind.gray3};
  transition: opacity 0.2s linear;
  ${Container}:hover & {
    opacity: 0.3;
  }
`;

function TopArtistCard({ artist, img, index, token }) {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const encodedArtist = encodeURIComponent(artist);
      const { data = [] } = await HttpClient.request(`/api/events/artist/${encodedArtist}`, token);
      console.log(artist, data);
      setEventData(data);
    };
    fetchEventData();
  }, []);
  // modal contains top tracks for artist
  // upcoming events
  // audio statistics if (song)

  const [showModal, toggleModal] = useModal(false);
  return (
    <>
      <Container data-number={index + 1} className={eventData.length ? 'selected' : null}>
        <TopOverlay>
          <Ranking>{index + 1}</Ranking>
          <ArtistName>
            <p>{artist}</p>
          </ArtistName>
          <OpenModal>?</OpenModal>
        </TopOverlay>
        <BackgroundImage src={img} />
        {/* <CenterOverlay>
          <SelectItem>✅</SelectItem>
          <MoreDetails onClick={toggleModal}>📖</MoreDetails>
        </CenterOverlay> */}
        <BottomOverlay>{`${eventData.length} events found`}</BottomOverlay>
      </Container>
      <Modal showing={showModal}>I'm the modal</Modal>
    </>
  );
}

export default TopArtistCard;
