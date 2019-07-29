import styled from 'styled-components';
import Head from '../components/head';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white};
  font-family: ${props => props.theme.textFont};
  font-size: 18px;
  min-height: calc(100vh - 50px);
`;

const Home = () => {
  return (
    <Container>
      <Head title="Home" />

      <div>HELLO WORLD</div>
    </Container>
  );
};

export default Home;
