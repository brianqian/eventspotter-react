import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Login from '../Login/Login';
import useModal from '../hooks/useModal';

const links = [
  { href: '/libraryPage', label: 'My Library', as: '/library' },
  { href: '/calendar', label: 'Calendar' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

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

const Nav = () => {
  const [isShowing, toggle] = useModal();
  // console.log(document.cookie);
  return (
    <StyledNav>
      <Link prefetch href="/">
        <a>Home</a>
      </Link>
      {links.map(({ key, href, label, as }) => (
        <Link href={href} key={key} as={as || ''}>
          <a>{label}</a>
        </Link>
      ))}
      <SignIn>
        <a href="http://localhost:3000/login" target="_blank">
          Login with Spotify
        </a>
      </SignIn>
      {/* <div>
        <button onClick={toggle}>Login/Sign Up</button>
        <Login isShowing={isShowing} hide={toggle} />
      </div> */}
    </StyledNav>
  );
};

export default Nav;
