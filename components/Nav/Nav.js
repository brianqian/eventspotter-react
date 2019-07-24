import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const links = [
  { href: '/libraryPage', label: 'My Library', as: '/library', key: 'nav-library-link' },
  { href: '/calendar', label: 'Calendar', key: 'nav-calendar-link' }
];

const StyledNav = styled.nav`
  background-color: ${props => props.theme.color.background};
  display: flex;
  height: 50px;
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
  background-color: #24d060;
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

const Nav = ({ userInfo }) => {
  console.log('TOKEN', userInfo);
  return (
    <StyledNav>
      <Link prefetch href="/">
        <a>Home</a>
      </Link>
      {links.map(({ key, href, label, as }) => (
        <Link prefetch href={href} key={key} as={as || ''}>
          <a>{label}</a>
        </Link>
      ))}
      <SignIn>
        <a href={`http://localhost:3000/api/auth/${userInfo ? 'logout' : 'login'}`}>
          {userInfo ? 'Logout' : 'Login with Spotify'}
        </a>
      </SignIn>
      <Welcome>
        {userInfo.displayName}
        <img src={userInfo.imgURL} alt="" height="50px" />
      </Welcome>
      {/* <div>
        <button onClick={toggle}>Login/Sign Up</button>
        <Login isShowing={isShowing} hide={toggle} />
      </div> */}
    </StyledNav>
  );
};

export default Nav;
