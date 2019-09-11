import Link from 'next/link';
import styled from 'styled-components';
import Dropdown from '../Dropdown/NavDropdown';

const Container = styled.div`
  /* position: absolute;
  top: ${(props) => props.theme.navHeight}; */
  height: auto;
  width: 100%;
  background-color: ${(props) => props.theme.tailwind.green9};
  color: ${(props) => props.theme.color.white};
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem;
`;

function ContextMenu({ setTopArtist, token, columns, setColumns }) {
  const audioAnalytics = {
    acousticness: 'Most Acoustic',
    danceability: 'Most Danceable',
    energy: 'Highest Energy',
    instrumentalness: 'Most Instrumental',
    loudness: 'Loudest',
    tempo: 'Highest Tempo',
    valence: 'Most Valent',
    speechiness: ' Most Speechy',
    liveness: 'Most Liveness',
  };

  // ! Context Menu Items
  // -> Events for selected artists
  // -> Filter by artists with events

  return (
    <Container>
      <MenuItem>
        {setTopArtist && (
          <Dropdown width="125">
            <p>Top Artists From: </p>
            <p onClick={() => setTopArtist('short', token)}>4 Weeks</p>
            <p onClick={() => setTopArtist('medium', token)}>6 months</p>
            <p onClick={() => setTopArtist('long', token)}>All time</p>
          </Dropdown>
        )}
      </MenuItem>
      <MenuItem>
        {/* <Dropdown>
          <label>Columns</label>
          {Object.keys(audioAnalytics).map((item) => (
            <p>{item}</p>
          ))}
        </Dropdown> */}
      </MenuItem>
    </Container>
  );
}

export default ContextMenu;
