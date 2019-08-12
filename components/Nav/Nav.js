import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useModal from '../../utils/hooks/useModal';
import UserSettings from '../UserSettingsModal/UserSettings';
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
  const [modalIsOpen, toggleModal] = useModal();
  return (
    <>
      <StyledNav>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>

        <Dropdown>
          <Link prefetch href="/libraryPage?filterBy=all" as="/library?filterBy=all">
            <a>My Library</a>
          </Link>
          <Link
            prefetch
            href="/libraryPage?filterBy=top_artists"
            as="/library?filterBy=top_artists"
          >
            <a>Top Artists</a>
          </Link>
          <Link prefetch href="/libraryPage" as="/library">
            <a>My Library</a>
          </Link>
        </Dropdown>
        <Welcome>
          <Dropdown>
            <img src={user.imgURL} alt="" height="47px" />
            <div onClick={toggleModal}>User Settings</div>
          </Dropdown>
        </Welcome>
      </StyledNav>
      <UserSettings isShowing={modalIsOpen} hide={toggleModal} />
    </>
  );
};

export default Nav;
