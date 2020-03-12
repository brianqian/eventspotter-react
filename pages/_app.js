import App from 'next/app';
import NProgress from 'nprogress';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from 'next/router';
import SettingsProvider from '../components/SettingsProvider/SettingsProvider';
import theme from '../static/cssTheme';
import Nav from '../components/Nav/Nav';

const GlobalStyle = createGlobalStyle`

body, html{
  font-family: ${(props) => props.theme.textFont};
  width: 100vw;
  max-width: 100vw;
  overflow:hidden;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: #EFEFF9;
    :visited {
      color: #EFEFF9;
    }
    text-decoration: none;
}

`;

Router.events.on('routeChangeStart', (url) => {
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
      <ThemeProvider theme={theme}>
        <SettingsProvider>
          <GlobalStyle theme={theme} />
          <Nav activePage={this.activePage} />
          <Component {...pageProps} setActivePage={this.setActivePage} />
        </SettingsProvider>
      </ThemeProvider>
    );
  }
}
