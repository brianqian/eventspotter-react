import App, { Container } from 'next/app';
import React from 'react';
import jwt from 'jsonwebtoken';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../static/cssTheme';
import Nav from '../components/Nav/Nav';
import { cookieToString } from '../utils/format';

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
  static async getInitialProps({ Component, ctx, ctx: { req } }) {
    const cookie = req ? req.cookies.userInfo : cookieToString(document.cookie, 'userInfo');
    let isLoggedIn = false;
    if (cookie) {
      const decodedToken = await jwt.verify(cookie, process.env.JWT_SECRET_KEY);
      if (decodedToken.userInfo) isLoggedIn = true;
    }
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps: { ...pageProps }, isLoggedIn };
  }

  render() {
    const { Component, pageProps, isLoggedIn } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav loggedIn={isLoggedIn} />
            <Component {...pageProps} loggedIn={isLoggedIn} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
