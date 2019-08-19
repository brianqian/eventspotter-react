import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import useModal from '../../utils/hooks/useModal';
import UserSettings from '../UserSettingsModal/UserSettings';
import Dropdown from '../NavDropdown/NavDropdown';
import HttpClient from '../../HttpClient';

const StyledNav = styled.nav`
  background-color: ${props => props.theme.color.background};
  display: flex;
  font-size: 20px;
  text-transform: uppercase;

  border-bottom: 1px solid ${props => props.theme.color.black};
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  height: ${props => (props.authenticated ? 50 : 0)}px;
  overflow: ${props => (props.authenticated ? 'visible' : 'hidden')};
  transition: 0.25s;
  z-index: 1000;

  a {
    color: ${props => props.theme.color.white};
    display: flex;
    align-items: center;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  > * {
    margin: 0 3rem;
    height: 50px;
    :hover {
      color: ${props => props.theme.color.green};
    }
  }
`;
const UserProfile = styled.div`
  color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 100%;
  }
`;

const Nav = () => {
  const [modalIsOpen, toggleModal] = useModal();
  const [user, setUser] = useState({ spotifyID: '', imgURL: '', displayName: '' });
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await HttpClient.request('/api/auth');
      setUser(userInfo);
    };
    console.log('USE EFFECT RUNNING');

    getUserInfo();
  }, []);
  return (
    <>
      <StyledNav authenticated={user.spotifyID}>
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
        <UserProfile>
          <Dropdown>
            <img src={user.imgURL} alt="" />
            <div onClick={toggleModal}>User Settings</div>
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </Dropdown>
        </UserProfile>
      </StyledNav>

      <UserSettings isShowing={modalIsOpen} hide={toggleModal} />
    </>
  );
};

export default Nav;
