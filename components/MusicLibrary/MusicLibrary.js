import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.background};
`;

function MusicLibrary({ className }) {
  return (
    <Container className={className}>
      MUSIC LIBRARY
      {process.env.clientID}
    </Container>
  );
}

MusicLibrary.getInitialProps = async context => {
  return {};
};

export default MusicLibrary;
