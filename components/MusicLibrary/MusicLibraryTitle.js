import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-size: 20px;
`;

const Section = styled.div`
  flex: ${props => props.width};
`;

function MusicLibraryTitle({ headers, widths, className }) {
  return (
    <Container className={className}>
      <Section width={widths.name || 2}>Title</Section>
      <Section width={widths.artist || 2}>Artist</Section>
      <Section width={widths.dateAdded || 1}>Date Added</Section>
      {headers.map(title => (
        <Section width={title.width || 1}>{headers.title}</Section>
      ))}
    </Container>
  );
}

export default MusicLibraryTitle;
