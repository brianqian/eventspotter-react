import App, { Container } from 'next/app';
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
    const cookie = req
      ? req.cookies && req.cookies.userInfo
      : cookieToString(document.cookie, 'userInfo');
    const decodedToken = cookie
      ? await jwt.verify(cookie, process.env.JWT_SECRET_KEY)
      : { userInfo: '' };
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps: { ...pageProps }, decodedToken };
  }

  render() {
    const { Component, pageProps, decodedToken } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav userInfo={decodedToken.userInfo} />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
