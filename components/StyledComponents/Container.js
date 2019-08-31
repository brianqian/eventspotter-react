import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  align-items: ${(props) => (props.center ? 'center' : 'normal')};
  justify-content: ${(props) => (props.center ? 'center' : 'normal')};
`;

export const GridContainer = styled.div`
  display: grid;
  align-items: ${(props) => (props.center ? 'center' : 'normal')};
  justify-content: ${(props) => (props.center ? 'center' : 'normal')};
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
`;
