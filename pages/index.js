import styled from 'styled-components';
import Link from 'next/link';
import Head from '../components/head';
import Router from 'next/router';

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
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 80px;
  padding-right: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const EventSpotter = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-size: 80px;
  font-display: swap;
  width: 60%;
  z-index: 2;
`;

const BodyText = styled.p`
  font-size: 24px;
  z-index: 2;
`;
const SignIn = styled.div`
  position: relative;
  right: 0;
  z-index: 2;

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
    font-family: 'Work Sans';
    font-size: 18px;
    z-index: 2;
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

const Home = ({ cookieExists }) => {
  const redirectURI = encodeURIComponent(`${process.env.FRONTEND_HOST}/api/auth/spotify_login`);
  const scopes = encodeURIComponent(
    'user-read-private user-read-email user-library-read user-top-read'
  );
  console.log('RUNNING IN DEVELOPMENT:PRODUCTION', process.env.NODE_ENV);
  console.log('REDIRECT URI', redirectURI);
  return (
    <Container>
      <Head title="Home" />
      <IntroDiv>
        <EventSpotter>EventSpotter.</EventSpotter>
        <BodyText>Find your favorite Top Artists on Spotify and their upcoming events.</BodyText>
        <BodyText>
          Sync your Spotify Account and use Spotify's powerful audio analysis tools to see hidden
          metrics.
        </BodyText>
        <BodyText>Get event information and ticket pricing</BodyText>
        <HeroImage src="../static/img/SpotifyExample-800.png" />
        {!cookieExists && (
          <SignIn>
            <Link
              href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${
                process.env.SPOTIFY_CLIENT_ID
              }&scope=${scopes}&redirect_uri=${redirectURI}`}
            >
              <a>LOGIN WITH SPOTIFY</a>
            </Link>
          </SignIn>
        )}
      </IntroDiv>
    </Container>
  );
};

Home.getInitialProps = ({ req, res }) => {
  const cookie = req ? req.headers.cookie : document.cookie;
  const cookieExists = cookie && cookie.includes('userInfo');
  return { cookieExists };
};

export default Home;
