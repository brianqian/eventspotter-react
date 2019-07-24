import React from 'react';
import styled from 'styled-components';
import TitleRow from './MusicLibraryTitle';
import Row from './MusicLibraryRow';
import BasicError from '../error';
import useFetch from '../../utils/hooks/useFetch';

const Container = styled.div`
  color: ${props => props.theme.color.white};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.library};
  font-family: 'Source Sans Pro';
`;

const StyledTitleRow = styled(TitleRow)`
  margin-bottom: 1rem;
`;

function TopArtists({ className, topArtists, columns, onError }) {
  const { library } = useFetch(topArtists);
  return (
    <Container className={className}>
      <StyledTitleRow widths={{}} columns={columns} />
      {onError && <BasicError />}
      {topArtists &&
        library.map(artist => (
          <Row key={artist.id} data={artist} columns={columns} type="topArtists" />
        ))}
    </Container>
  );
}

export default TopArtists;
