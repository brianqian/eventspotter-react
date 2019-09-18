import NProgress from 'nprogress';
import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import Link from 'next/link';
import useModal from '../../utils/hooks/useModal';
import Dropdown from '../Dropdown/NavDropdown';
import UserSettingsModal from '../UserSettingsModal/UserSettings';
import SettingsIcon from '../Icons/SettingsIcon';

const StyledNav = styled.nav`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: flex-end;

  border-bottom: 1px solid ${(props) => props.theme.tailwind.gray9};
  width: 100vw;
  height: ${(props) => (props.loggedIn ? props.theme.navHeight : 0)};
  overflow: ${(props) => (props.loggedIn ? 'visible' : 'hidden')};
  transition: 0.25s;
  z-index: 1000;
  background-color: ${(props) => props.theme.color.background};

  a {
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
  label {
    color: ${(props) => props.theme.color.white};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > * {
    margin: 0 0.5rem;
    min-width: 150px;
    /* height: 100%; */
    :last-child {
      min-width: 40px;
      cursor: pointer;
      margin: auto 0;
      display: flex;
      align-content: center;
    }
  }
`;

const Nav = ({ theme }) => {
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
      <StyledNav loggedIn={user.spotifyID}>
        <Link prefetch href="/">
          <label>
            <a>Home</a>
          </label>
        </Link>
        <Link prefetch href="/libraryPage" as="/library">
          <label>
            <a>Library</a>
          </label>
        </Link>
        <Dropdown width="175px">
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
        <div onClick={toggleModal}>
          <SettingsIcon height="24px" hoverColor={theme.color.green} />
          {/* <img
            src="/static/icons/settings.svg"
            alt="settings"
            onClick={toggleModal}
            height="25px"
          /> */}
        </div>
        {/* <Link href="/logout"> */}
      </StyledNav>
      <UserSettingsModal
        isShowing={modalIsOpen}
        hide={toggleModal}
        img={user.imgURL}
        name={user.displayName}
      />
    </>
  );
};

export default withTheme(Nav);
