import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNav = styled.nav`
  background-color: ${props => props.theme.color.background};
  display: flex;
  /* height: 50px; */
  border-bottom: 1px solid ${props => props.theme.color.black};
  padding: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  z-index: 1000;
  a {
    color: ${props => props.theme.color.white};
  }
  > * {
    margin: 0 3rem;
  }
`;
const Welcome = styled.div`
  color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
`;

const Nav = () => {
  const [userInfo, setUserInfo] = useState({ displayName: '', imgURL: '' });
  useEffect(() => {
    const fetchUserInfo = async () => {
      let resp = await fetch('/api/auth/');
      if (resp.status === 200) {
        resp = await resp.json();
        setUserInfo(resp);
      } else {
        console.log('IN NAV STATUS', resp.status);
      }
    };
    fetchUserInfo();
  }, []);
  return (
    <StyledNav>
      <Link prefetch href="/">
        <a>Home</a>
      </Link>

      <Link prefetch href="/libraryPage" as="/library">
        <a>My Library</a>
      </Link>
      <Welcome>
        {userInfo.displayName}
        <img src={userInfo.imgURL} alt="" height="47px" />
      </Welcome>
    </StyledNav>
  );
};

export default Nav;
