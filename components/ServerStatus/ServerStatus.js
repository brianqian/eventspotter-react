import styled from 'styled-components';

const Container = styled.div`
  height: 20px;
  background-color: transparent;
  position: absolute;
`;
const Warning = styled.div`
  display: none;
  position: absolute;
  color: white;
  left: 22px;
  top: 3px;
  width: 200px;
  font-size: 16px;
`;

const Icon = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  &:hover ${Warning} {
    display: flex;
  }
  opacity: 0.4;
`;

const displayWarning = () => {};

function ServerStatus() {
  return (
    <Container>
      <Icon role="img" aria-label="warning-server-connecting" onMouseEnter={displayWarning}>
        ⚠️
        <Warning>Server is loading...</Warning>
      </Icon>
    </Container>
  );
}

export default ServerStatus;
