import App, { Container } from 'next/app';
import fetch from 'isomorphic-unfetch';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
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
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps: { ...pageProps } };
  }
  state = {
    serverConnected: false,
    activePage: 'home'
  };

  setActivePage = page => {
    console.log('active page being set: ', page);
    this.setState({ activePage: page });
  };

  render() {
    console.log(this.state, '🐷');
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav activePage={this.activePage} />
            <Component {...pageProps} setActivePage={this.setActivePage} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
