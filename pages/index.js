import styled from 'styled-components';
import Head from '../components/head';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  min-height: calc(100vh - 50px);
`;

const SignIn = styled.div`
  width: 150px;
  height: 35px;
  border-radius: 35px;
  background-color: ${props => props.theme.color.green};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  > a {
    color: ${props => props.theme.color.accent};
  }
`;
const Home = () => {
  return (
    <Container>
      <Head title="Home" />
      <div>HELLO WORLD</div>
      <SignIn>
        <a href="http://localhost:3000/api/auth/login">Login with Spotify</a>
      </SignIn>
    </Container>
  );
};

Home.getInitialProps = ({ req, res }) => {
  console.log('HEADER IN HOME', req && req.headers);
};

export default Home;
