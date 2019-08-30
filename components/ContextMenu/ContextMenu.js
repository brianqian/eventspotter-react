import Link from 'next/link';
import styled from 'styled-components';
import Dropdown from '../NavDropdown/NavDropdown';

const Container = styled.div`
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
        <label>Audio Analytics: </label>
        <Link
          prefetch
          href={{ pathname: '/top', query: { filterBy: 'artists' } }}
          as="/top/artists"
        >
          <a>Top Artists</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          prefetch
          href={{ pathname: '/top', query: { filterBy: 'acousticness' } }}
          as="/top/acousticness"
        >
          <a>Most Acoustic</a>
        </Link>
      </MenuItem>
      <MenuItem>Load all songs</MenuItem>
    </Container>
  );
}

export default ContextMenu;
