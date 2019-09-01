import Link from 'next/link';
import styled from 'styled-components';
import Dropdown from '../NavDropdown/NavDropdown';
import { FlexContainer } from '../StyledComponents/Container';

const Container = styled.div`
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

function ContextMenu() {
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
  return (
    <Container>
      <MenuItem>
        <Dropdown>
          <label>Quick Access </label>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'artists' } }}
            as="/top/artists"
          >
            <a>Top Artists</a>
          </Link>
          {Object.keys(audioAnalytics).map((item) => (
            <Link
              prefetch
              href={{ pathname: '/top', query: { filterBy: item } }}
              as={`/top/${item}`}
            >
              <a>{audioAnalytics[item]}</a>
            </Link>
          ))}
        </Dropdown>
      </MenuItem>
      <MenuItem>
        <Dropdown>
          <label>Columns</label>
          {Object.keys(audioAnalytics).map((item) => (
            <p>{item}</p>
          ))}
        </Dropdown>
      </MenuItem>
    </Container>
  );
}

export default ContextMenu;
