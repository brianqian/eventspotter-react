import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

function MusicSidebar({ className, setSortBy, sortBy, getArtists }) {
  const generateCalendar = () => {
    const artists = getArtists();
    const query = querystring.encode({ artists });
    // make fetch request to backend with list of top artists generated from cookie
    Router.push(`/calendar?${query}`);
    // fetch(`http://localhost:3000/api/calendar/generate_calendar?${query}`);
  };

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

      <ButtonContainer>
        <Button onClick={generateCalendar} />
      </ButtonContainer>
    </Container>
  );
}

export default MusicSidebar;
