import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../data/cssTheme";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900&display=swap");
body, html{
  font-family: ${props => props.theme.textFont};
  max-width: 100vw;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
