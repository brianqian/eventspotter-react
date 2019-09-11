import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { withTheme } from 'styled-components';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Modal = styled.div`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.background};
  box-shadow: -10px 10px 10px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: ${(props) => props.height || '50vh'};
  width: ${(props) => props.width || '50vw'};
  padding: ${(props) => props.padding || '2rem'};

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 1000;
  overflow: scroll;
`;

const CloseContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1rem;
  right: 1rem;
`;

const Login = ({ isShowing, hide, theme, children, height, width, padding }) => {
  const [strokeColor, setStrokeColor] = useState('#fff');
  // TODO: add 'esc' key event listener to close
  const closeModal = () => {
    hide();
    setStrokeColor('#fff');
  };
  return isShowing
    ? ReactDOM.createPortal(
        <Background>
          <Modal height={height} width={width} padding={padding}>
            <CloseContainer
              onClick={closeModal}
              onMouseEnter={() => setStrokeColor(theme.color.green)}
              onMouseLeave={() => setStrokeColor('#fff')}
            >
              <svg
                fill="none"
                stroke={strokeColor}
                height="1.5em"
                width="1.5em"
                viewBox="0 0 24 24"
              >
                <g strokeWidth="2" fill="none" strokeLinecap="round">
                  <path d="M6,6 L18,18" />
                  <path d="M6,18 L18,6" />
                </g>
              </svg>
            </CloseContainer>
            {children}
          </Modal>
        </Background>,
        document.body
      )
    : null;
};

export default withTheme(Login);
