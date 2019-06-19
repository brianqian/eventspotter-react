import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/Nav/Nav';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  min-height: 100vh;
`;

const Home = () => (
  <Container>
    <Head title="Home" />
    <Nav />
    <div>HELLO WORLD</div>
  </Container>
);

export default Home;
