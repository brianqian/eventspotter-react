import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav/Nav';

const Container = styled.div`
  background-color: ${props => props.theme.color.background};
  display: grid;
`;

const Calendar = () => {
  return <Container>Hello I'm Calendar</Container>;
};

export default Calendar;
