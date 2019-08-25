import styled from 'styled-components';
import Head from 'next/head';
import Error401 from '../components/Error/401';
import Error404 from '../components/Error/404';
import Error500 from '../components/Error/500';

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
  const ErrorComponent = () => {
    switch (code) {
      case '401':
        return <Error401 />;
      case '500':
        return <Error500 />;
      default:
        return <Error404 />;
    }
  };
  return (
    <Container>
      <Head>
        <title>Error -{code}</title>
      </Head>

      <ErrorMessage>
        <ErrorComponent />
      </ErrorMessage>
    </Container>
  );
}

errorPage.getInitialProps = ({ req, res, query }) => {
  console.log('ERROR PAGE GIP. QUERY: ', query);
  const { code } = query;
  return { code };
};

export default errorPage;
