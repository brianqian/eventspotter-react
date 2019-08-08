import styled from 'styled-components';
import Head from '../components/head';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  height: 100vh;
`;

const IntroDiv = styled.div`
  align-items: center;
  width: 100%;
  /* height: 60vh; */
  text-align: right;
  /* display: grid; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  padding-right: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Welcome = styled.h1`
  font-size: 80px;
  width: 60%;
  z-index: 2;
`;

const BodyText = styled.p`
  font-size: 24px;
  z-index: 2;
`;
const SignIn = styled.div`
  position: relative;
  z-index: 2;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 1rem 1rem 0 0;
  padding: 10px 20px;

  border-radius: 25px;
  background-color: ${props => props.theme.color.green};

  user-select: none;
  cursor: pointer;
  > a {
    font-family: 'Roboto Condensed';
    font-size: 23px;
    color: ${props => props.theme.color.white};
    text-decoration: none;
  }
`;

const HeroImage = styled.img`
  width: 700px;
  opacity: 0.3;
  box-shadow: ${props => props.theme.bs};
  margin: 2rem;
  position: absolute;
  left: 40px;
  box-shadow: -11px 39px 18px 0px rgba(0, 0, 0, 1);
  z-index: 1;
`;

const Home = () => {
  return (
    <Container>
      <Head title="Home" />
      <IntroDiv>
        <Welcome>EventSpotter.</Welcome>
        <BodyText>Find your favorite Top Artists on Spotify and their upcoming events.</BodyText>
        <HeroImage src="../static/img/SpotifyExample-800.png" />

        <SignIn>
          <a href="http://localhost:3000/api/auth/login">Login with Spotify</a>
        </SignIn>
      </IntroDiv>
    </Container>
  );
};

Home.getInitialProps = ({ req, res }) => {
  console.log('HEADER IN HOME', req && req.headers);
};

export default Home;
