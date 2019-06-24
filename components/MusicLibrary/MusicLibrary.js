import React from 'react';
import styled from 'styled-components';
import TitleRow from './MusicLibraryTitle';
import Row from './MusicLibraryRow';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.library};
  /* font-family: 'Roboto'; */
  font-family: 'Source Sans Pro';
`;

const StyledTitleRow = styled(TitleRow)`
  margin-bottom: 1rem;
`;

function MusicLibrary({ className, library, columns }) {
  return (
    <Container className={className}>
      <StyledTitleRow widths={{}} columns={columns} />
      {library && library.map(item => <Row key={item.track.id} data={item} columns={columns} />)}
    </Container>
  );
}

export default MusicLibrary;
