import React from 'react';
import Head from '../components/head';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  min-height: 100vh;
`;

const Home = () => {
  return (
    <Container>
      <Head title="Home" />
      <div>HELLO WORLD</div>
    </Container>
  );
};

export default Home;
