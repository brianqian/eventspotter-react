import React from 'react';
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
`;

const CloseModal = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
`;

const ManualLoginForm = styled.form`
  display: grid;
  height: 35%;
  align-self: flex-end;
`;

const Login = ({ isShowing, hide }) => {
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
            <ManualLoginForm>
              <label htmlFor=""> E-mail: </label>
              <input type="text" />
              <label htmlFor=""> Password: </label>
              <input type="text" />
              <div>Login</div>
            </ManualLoginForm>
          </Modal>
        </Container>,
        document.body
      )
    : null;
};

export default Login;