import styled from 'styled-components';
import Head from 'next/head';
// import Error401 from '../components/Error/401';
// import Error404 from '../components/Error/404';
// import * as Error500 from '../components/Error/500'

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  min-height: calc(100vh - 50px);
  a {
    color: ${props => props.theme.color.white};
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

function errorPage({ code }) {
  return (
    <Container>
      <Head>
        <title>Error -{code}</title>
      </Head>

      <ErrorMessage>
        <div>something went wrong</div>
      </ErrorMessage>
    </Container>
  );
}

errorPage.getInitialProps = ({ req, res, query }) => {
  console.log('ERROR PAGE GIP. QUERY: ', query);
  console.log('res', res.statusCode);
  const { code } = query;
  if (!code) console.log(code, 'ERROR PAGE ERRORED 😰');
  return { code: query.code };
};

export default errorPage;
