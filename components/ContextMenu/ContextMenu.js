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
  return (
    <Container>
      <MenuItem>
        <Dropdown>
          <label>Quick Access: </label>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'artists' } }}
            as="/top/artists"
          >
            <a>Top Artists</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'acousticness' } }}
            as="/top/acousticness"
          >
            <a>Most Acoustic</a>
          </Link>

          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'danceability' } }}
            as="/top/danceability"
          >
            <a>Most Danceable</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'energy' } }}
            as="/top/energy"
          >
            <a>Most Energy</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'instrumentalness' } }}
            as="/top/instrumentalness"
          >
            <a>Most Instrumental</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'loudness' } }}
            as="/top/loudness"
          >
            <a>Loudest</a>
          </Link>
          <Link prefetch href={{ pathname: '/top', query: { filterBy: 'tempo' } }} as="/top/tempo">
            <a>Highest Tempo</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'valence' } }}
            as="/top/valence"
          >
            <a>Most Valent</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'speechiness' } }}
            as="/top/speechiness"
          >
            <a>Speechiest</a>
          </Link>
          <Link
            prefetch
            href={{ pathname: '/top', query: { filterBy: 'liveness' } }}
            as="/top/liveness"
          >
            <a>Most Live</a>
          </Link>
        </Dropdown>
      </MenuItem>
      <MenuItem>
        <Dropdown>
          <label>Columns</label>
          <p>Acousticness</p>
          <p>Tempo</p>
        </Dropdown>
      </MenuItem>
    </Container>
  );
}

export default ContextMenu;
