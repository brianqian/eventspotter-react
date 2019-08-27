import Link from 'next/link';
import styled from 'styled-components';
import Dropdown from '../NavDropdown/NavDropdown';

const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.tailwind.green9};
  color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem;
`;

function ContextMenu({ filterBy }) {
  return (
    <Container>
      <MenuItem>
        <label>Sort By:</label>
      </MenuItem>
      <MenuItem>Load all songs</MenuItem>
    </Container>
  );
}

export default ContextMenu;
