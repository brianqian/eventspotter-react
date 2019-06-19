import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Login from '../Login/Login';
import useModal from '../hooks/useModal';

const links = [{ href: '/calendar', label: 'Calendar' }].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const StyledNav = styled.nav`
  display: flex;
  height: 70px;
  border-bottom: 1px solid white;
  a {
    color: ${props => props.theme.color.white};
  }
`;

const Nav = () => {
  const [isShowing, toggle] = useModal();

  return (
    <StyledNav>
      <Link prefetch href="/">
        <a>Home</a>
      </Link>
      {links.map(({ key, href, label }) => (
        <Link href={href} key={key}>
          <a>{label}</a>
        </Link>
      ))}
      <div>
        <button onClick={toggle}>Show Login</button>
        <Login isShowing={isShowing} hide={toggle} />
      </div>
    </StyledNav>
  );
};

export default Nav;
