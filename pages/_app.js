import App, { Container } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import fetch from 'isomorphic-unfetch';
import theme from '../static/cssTheme';
import Nav from '../components/Nav/Nav';

const GlobalStyle = createGlobalStyle`

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

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx, ctx: { req, res } }) {
    const cookie = req ? req.headers.cookie : document.cookie;
    // Checks if cookie exists to display Nav.
    // Navigating to unauthorized routes with an invalid cookie will be handled serverside
    const resp = await fetch('http://localhost:3000/api/auth/', {
      credentials: 'include',
      headers: { cookie }
    });
    const user = resp.status === 200 && (await resp.json());
    const cookieExists = cookie && (cookie.userInfo || cookie.includes('userInfo'));
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps: { ...pageProps }, user };
  }

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            {user && <Nav user={user} />}
            <Component {...pageProps} user={user} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
