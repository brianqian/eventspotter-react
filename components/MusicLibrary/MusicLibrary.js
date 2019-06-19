import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.background};
`;

function MusicLibrary({ className }) {
  return <Container className={className}>MUSIC LIBRARY</Container>;
}

export default MusicLibrary;
