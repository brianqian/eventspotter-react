import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import styled from "styled-components";

const Test = styled.div`
  font-family: ${props => props.theme.textFont};
  background-color: blue;
`;

const Home = () => (
  <Test>
    <Head title="Home" />
    <Nav />
    <Test>HELLOW ROLD</Test>
  </Test>
);

export default Home;
