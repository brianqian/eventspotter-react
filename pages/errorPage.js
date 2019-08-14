import styled from 'styled-components';
import Head from 'next/head';
import Error from '../components/Error';

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
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

function errorPage({ code }) {
  return (
    <Container>
      <Head>
        <title>
Error -
          {code}
        </title>
      </Head>

      {code ? <ErrorMessage>{Error[code]()}</ErrorMessage> : <div>Something went wrong!</div>}
    </Container>
  );
}

errorPage.getInitialProps = ({ query }) => {
  return { code: query.code };
};

export default errorPage;
