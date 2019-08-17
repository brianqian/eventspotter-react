import App, { Container } from 'next/app';
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
  // static async getInitialProps({ Component, ctx, ctx: { req, res } }) {
  //   let pageProps = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }
  //   return { pageProps: { ...pageProps } };
  // }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
