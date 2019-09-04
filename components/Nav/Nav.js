import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useModal from '../../utils/hooks/useModal';
import NProgress from 'nprogress';
import UserSettings from '../UserSettingsModal/UserSettings';
import Dropdown from '../NavDropdown/NavDropdown';
import UserSettingsModal from '../UserSettingsModal/UserSettings';

const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.color.background};
  display: flex;
  font-size: 18px;
  /* text-transform: uppercase; */

  border-bottom: 1px solid ${(props) => props.theme.color.black};
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  height: ${(props) => (props.loggedIn ? props.theme.navHeight : 0)}px;
  overflow: ${(props) => (props.loggedIn ? 'visible' : 'hidden')};
  transition: 0.25s;
  z-index: 1000;
  /* position: absolute;
  top: 0; */

  a {
    color: ${(props) => props.theme.color.white};
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;

    :hover {
      text-decoration: underline;
      color: ${(props) => props.theme.color.green};
    }
    &.active {
      color: green;
    }
  }
  > * {
    margin: 0 0.5rem;
    min-width: 150px;
  }
`;
const UserProfile = styled.div`
  color: ${(props) => props.theme.color.white};
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
    let isMounted = true;
    NProgress.start();
    const getUserInfo = async () => {
      const resp = await fetch('/api/auth/user_info', {
        credentials: 'include',
      });
      const { userInfo = null } = await resp.json();
      console.log('userinfo retrieved', userInfo);
      if (userInfo && isMounted) {
        setUser(userInfo);
        NProgress.done();
      }
      return () => (isMounted = false);
    };

    getUserInfo();
  }, []);

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
    <>
      <StyledNav loggedIn={user}>
        <Link prefetch href="/">
          <label>
            <a>Home</a>
          </label>
        </Link>
        <Link prefetch href="/libraryPage" as="/library">
          <label>
            <a>My Library</a>
          </label>
        </Link>
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
              key={item}
            >
              <a>{audioAnalytics[item]}</a>
            </Link>
          ))}
        </Dropdown>

        <UserProfile>
          <Dropdown width="175">
            <img src={user.imgURL} alt="" />
            <div onClick={toggleModal}>User Settings</div>
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </Dropdown>
        </UserProfile>
      </StyledNav>
      <UserSettingsModal isShowing={modalIsOpen} hide={toggleModal} />
    </>
  );
};

export default Nav;
