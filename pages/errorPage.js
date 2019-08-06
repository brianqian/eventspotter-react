import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

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
const Error401 = () => {
  const ErrorCode = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <ErrorCode>
      <h1>User Account Error!</h1>
      <p>
        Click
        {' '}
        <Link prefetch href="/api/auth/login">
          <a>here</a>
        </Link>
        {' '}
        to try logging in again!
      </p>
      <Link prefetch href="/">
        <a>
          <p>{'<- Go HOME'}</p>
        </a>
      </Link>
    </ErrorCode>
  );
};

function errorPage({ code }) {
  return (
    <Container>
      <Head>
        <title>
Error -
          {code}
        </title>
      </Head>
      {code === '401' && <Error401 />}
      {code === '404' && <div>Page not found, redirecting?</div>}
    </Container>
  );
}

errorPage.getInitialProps = ({ query }) => {
  return { code: query.code };
};

export default errorPage;
