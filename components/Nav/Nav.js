import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNav = styled.nav`
  background-color: ${props => props.theme.color.background};
  display: flex;
  height: 50px;
  padding: 0.5rem;
  border-bottom: 1px solid white;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  a {
    color: ${props => props.theme.color.white};
  }
  > * {
    margin: 0 3rem;
  }
`;

const SignIn = styled.div`
  width: 150px;
  height: 35px;
  border-radius: 35px;
  background-color: ${props => props.theme.color.green};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  > a {
    color: ${props => props.theme.color.accent};
  }
`;

const Welcome = styled.div`
  color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
`;

const Nav = () => {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const fetchUserInfo = async () => {
      let resp = await fetch('/api/auth/');
      if (resp.status === 200) {
        resp = await resp.json();
        setUserInfo(resp);
      } else {
        console.log('IN NAV STATUS', resp.status);
        setUserInfo(null);
        Router.push('/');
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

      {/* <SignIn>
            <a href={`http://localhost:3000/api/auth/${userInfo ? 'logout' : 'login'}`}>
              {userInfo ? 'Logout' : 'Login with Spotify'}
            </a>
          </SignIn> */}
      <Welcome>
        {userInfo.displayName}
        <img src={userInfo.imgURL} alt="" height="47px" />
      </Welcome>
    </StyledNav>
  );
};

export default Nav;
