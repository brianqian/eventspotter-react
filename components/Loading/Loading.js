import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <Container>
      <p> Loading...</p>
    </Container>
  );
}

export default Loading;
