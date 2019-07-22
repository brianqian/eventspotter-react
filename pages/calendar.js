import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
`;

const Calendar = () => {
  return <Container>Hello I&apos;m Calendar</Container>;
};

export default Calendar;
