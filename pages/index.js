import React from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from '../components/head';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  min-height: calc(100vh - 50px);
`;

const fetchFn = async () => {
  let resp = await fetch('http://localhost:3000/api/auth/test');
  resp = await resp.json();
  console.log(resp);
};

const Home = () => {
  return (
    <Container>
      <Head title="Home" />
      <button onClick={fetchFn} type="button">
        CLICK ME TO FETCH
      </button>
      <div>HELLO WORLD</div>
    </Container>
  );
};

export default Home;
