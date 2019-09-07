import { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { withTheme } from 'styled-components';

const Modal = styled.div`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.background};
  box-shadow: ${(props) => props.theme.bs};
  border: 1px solid white;
  height: ${(props) => props.height || '50vh'};
  width: ${(props) => props.width || '50vw'};
  padding: ${(props) => props.padding || '2rem'};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 1000;
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
  const modalRef = useRef(null);

  const [strokeColor, setStrokeColor] = useState('#fff');
  return isShowing
    ? ReactDOM.createPortal(
        <Modal ref={modalRef} height={height} width={width} padding={padding}>
          <CloseContainer onClick={hide}>
            <svg
              fill="none"
              onMouseEnter={() => setStrokeColor(theme.color.green)}
              onMouseLeave={() => setStrokeColor('#fff')}
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
        </Modal>,
        document.body
      )
    : null;
};

export default withTheme(Login);
