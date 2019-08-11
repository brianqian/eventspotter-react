import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Dropdown from '../NavDropdown/NavDropdown';

const StyledNav = styled.nav`
  background-color: ${props => props.theme.color.background};
  display: flex;
  font-size: 20px;
  text-transform: uppercase;

  border-bottom: 1px solid ${props => props.theme.color.black};
  padding: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  z-index: 1000;
  a {
    color: ${props => props.theme.color.white};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  > * {
    margin: 0 3rem;
    :hover {
      color: ${props => props.theme.color.green};
    }
  }
`;
const Welcome = styled.div`
  color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
`;

const Nav = ({ user }) => {
  return (
    <StyledNav>
      <Link prefetch href="/">
        <a>Home</a>
      </Link>

      <Dropdown>
        <Link prefetch href="/libraryPage" as="/library">
          <a>My Library</a>
        </Link>
        <Link prefetch href="/libraryPage" as="/library">
          <a>My Library</a>
        </Link>
        <Link prefetch href="/libraryPage" as="/library">
          <a>My Library</a>
        </Link>
      </Dropdown>
      <Welcome>
        {user.displayName}
        <img src={user.imgURL} alt="" height="47px" />
      </Welcome>
    </StyledNav>
  );
};

export default Nav;
