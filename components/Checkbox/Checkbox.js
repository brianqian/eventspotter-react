import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 15px;
  width: 15px;
  background-color: ${(props) => (props.isChecked ? props.theme.green : 'black')};
  border: 1px solid white;
  border-radius: 2px;
`;

const handleClick = (name) => {
  console.log(name);
  // toggle
};

const Checkbox = React.memo(({ isChecked = false, name }) => {
  return <Container isChecked={isChecked} onClick={() => handleClick(name)} />;
});

export default Checkbox;
