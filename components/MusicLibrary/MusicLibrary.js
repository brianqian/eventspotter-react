import React from 'react';
import styled from 'styled-components';
import TitleRow from './MusicLibraryTitle';
import Row from './MusicLibraryRow';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.background};
  font-family: 'Roboto';
`;

const StyledTitleRow = styled(TitleRow)`
  margin-bottom: 1rem;
`;

function MusicLibrary({ className, tracks }) {
  console.log(tracks);
  return (
    <Container className={className}>
      <StyledTitleRow widths={{}} headers={[]} />
      {tracks &&
        tracks.length &&
        tracks.map(item => <Row key={item.track.id} data={item} widths={{}} />)}
    </Container>
  );
}

export default MusicLibrary;
