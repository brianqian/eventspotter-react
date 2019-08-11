import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: ${props => props.theme.color.background};
  box-shadow: ${props => props.theme.bs};
  border: 1px solid white;
  display: grid;
  height: 500px;
  padding: 2rem;
  position: relative;
  width: 400px;
  z-index: 1000;
`;

const CloseModal = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  z-index: 1000;
`;

const SettingsContainer = styled.div`
  display: grid;
  height: 35%;
  align-self: flex-end;
  z-index: 1000;
`;

const UserSettings = ({ isShowing, hide }) => {
  return isShowing
    ? ReactDOM.createPortal(
      <Container>
        <Modal>
          <CloseModal onClick={hide}>
            <svg fill="none" stroke="#fff" height="1.5em" width="1.5em" viewBox="0 0 24 24">
              <g strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M6,6 L18,18" />
                <path d="M6,18 L18,6" />
              </g>
            </svg>
          </CloseModal>
          <SettingsContainer>
            <label>
                Date format:
              <select name="" id="">
                <option value="">Month/Day</option>
                <option value="">Day/Month</option>
              </select>
            </label>
          </SettingsContainer>
        </Modal>
      </Container>,
        document.body
      )
    : null;
};

export default UserSettings;
