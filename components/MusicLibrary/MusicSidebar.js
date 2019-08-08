import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

function MusicSidebar({ className, setSortBy, sortBy }) {
  return (
    <Container className={className}>
      <h2>Filters</h2>
      <p>Filter Library by: </p>
      <select name="" id="" onChange={e => setSortBy(e.target.value)}>
        <option value="all">All songs</option>
        <option value="top_artists">Top Artists</option>
        <option value="high_danceability">Most Danceable</option>
        <option value="high_acousticness">Most Acoustic</option>
        <option value="high_energy">Most Energy</option>
        <option value="high_instrumentalness">Most Instrumental</option>
        <option value="high_loudness">Loudest</option>
        <option value="high_tempo">Highest Tempo</option>
        <option value="high_valence">Happiest</option>
      </select>

      {sortBy === 'top_artists' && (
        <>
          <p>In the last...</p>
          <select name="" id="">
            <option value="short_term">4 weeks</option>
            <option value="medium_term">6 months</option>
            <option value="short_term">few years</option>
          </select>
        </>
      )}

      <ButtonContainer>{/* <Button onClick={generateCalendar} /> */}</ButtonContainer>
    </Container>
  );
}

export default MusicSidebar;
