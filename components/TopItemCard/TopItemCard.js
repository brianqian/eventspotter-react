import styled from 'styled-components';
import useModal from '../../utils/hooks/useModal';

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
  &::after {
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

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  transform: translateY(-100px);
  background-color: ${(props) => props.theme.tailwind.gray1};
  z-index: 5;
  opacity: 0.75;
  transition: 0.3s ease-in;
  text-overflow: ellipses;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
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
  user-select: none;
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
function TopArtistCard({ title, text, img, index }) {
  const [showModal, toggleModal] = useModal(false);
  return (
    <>
      <Container data-number={index + 1}>
        <TopOverlay>{title}</TopOverlay>
        <BackgroundImage src={img} />
        <CenterOverlay>
          <SelectItem>✅</SelectItem>
          <MoreDetails onClick={toggleModal}>📖</MoreDetails>
        </CenterOverlay>
        <BottomOverlay>{text}</BottomOverlay>
      </Container>
      <Modal showing={showModal}>I'm the modal</Modal>
    </>
  );
}

export default TopArtistCard;
