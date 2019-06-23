import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.background};
`;

function MusicLibrary({ className, tracks }) {
  return (
    <Container className={className}>
      MUSIC LIBRARY
      {tracks &&
        tracks.length &&
        tracks.map(item => <div key={item.track.id}>{item.track.name}</div>)}
    </Container>
  );
}

export default MusicLibrary;