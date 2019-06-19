import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.background};
`;

const Button = styled.div`
  height: 80px;
  width: 80px;
  background-color: red;
  box-shadow: -8px 8px darkred;
  border-radius: 50px;
  justify-self: center;
  position: absolute;
  top: 5rem;
  :active {
    opacity: 0.9;
    translate: transformY(5px);
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  position: relative;
  label {
    width: 100%;
    text-align: center;
  }
`;

function MusicSidebar({ className }) {
  return (
    <Container className={className}>
      <ButtonContainer>
        <Button />
        <label htmlFor="">Generate Calendar</label>
      </ButtonContainer>
    </Container>
  );
}

export default MusicSidebar;
