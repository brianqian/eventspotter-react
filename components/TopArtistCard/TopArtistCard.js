import styled from 'styled-components';
import useModal from '../../utils/hooks/useModal';

const Container = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${(props) => props.theme.tailwind.gray8};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
`;

const Modal = styled.div`
  overflow: hidden;
  position: absolute;
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateY(-100px);
  background-color: #222;
  z-index: 5;
  transition: 0.25s linear;
  text-align: center;
  ${Container}:hover & {
    transform: translate(0);
  }
`;

const BottomOverlay = styled(TopOverlay)`
  top: initial;
  bottom: 0;
  transform: translateY(100px);
`;

const BackgroundImage = styled.img`
  height: 200px;
  width: 200px;
  opacity: 0.4;
  background-color: ${(props) => props.theme.tailwind.gray3};
  transition: opacity 0.4s linear;
  :hover {
    opacity: 0.3;
  }
`;

const CenterOverlay = styled.div`
  opacity: 0;
  height: 0;
  width: 0;
  top: 0;
  left: 0;
  position: absolute;
  justify-content: center;
  align-items: center;
  transition: opacity 0.25s ease-in;
  overflow: hidden;
  z-index: 5;
  div {
    margin: 0 2rem;
  }
  ${Container}:hover & {
    display: flex;
    height: 100%;
    width: 100%;
    opacity: 1;
  }
`;

const SelectItem = styled.div``;

const MoreDetails = styled.div``;
function TopArtistCard() {
  const [showModal, toggleModal] = useModal();
  return (
    <>
      <Container>
        <TopOverlay>GriZ</TopOverlay>
        <BackgroundImage src={'placeholder'} />
        <CenterOverlay>
          <SelectItem>✅</SelectItem>
          <MoreDetails onClick={toggleModal}>📖</MoreDetails>
        </CenterOverlay>
        <BottomOverlay>15 events found</BottomOverlay>
      </Container>
      <Modal showing={showModal}>I'm the modal</Modal>
    </>
  );
}

export default TopArtistCard;
