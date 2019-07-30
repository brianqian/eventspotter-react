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
  position: relative;
  top: 5rem;
  :active {
    opacity: 0.9;
    translate: transformY(5px);
  }
`;

const Filterby = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function MusicSidebar({ className, setSortBy }) {
  return (
    <Container className={className}>
      <ButtonContainer>
        <h2>Filters</h2>
        {/* <Button />   */}
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
      </ButtonContainer>
    </Container>
  );
}

export default MusicSidebar;
