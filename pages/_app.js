import App, { Container } from 'next/app';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../static/cssTheme';
import Nav from '../components/Nav/Nav';
import { fetchCookie } from '../utils/fetch';

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700|Source+Sans+Pro:400,900&display=swap");
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
  static async getInitialProps({ Component, ctx, ctx: { req, res } }) {
    const userInfo = req ? req.cookies.userInfo : fetchCookie(document.cookie, userInfo);
    // check localStorage for JWT userID
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { ...pageProps, userInfo };
  }

  render() {
    const { Component, pageProps, userInfo } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav jwt={userInfo || ''} />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
