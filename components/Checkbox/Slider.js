import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50px;
  height: 20px;
  border-radius: 12px;
  border: 0.5px solid ${(props) => props.theme.tailwind.gray5};
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.library};
  /* box-shadow: -2px -3px 4px rgba(0, 0, 0, 0.2); */
`;

const Marker = styled.span`
  height: 100%;
  width: 20px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.tailwind.gray4};
  border: 0.75px solid ${(props) => props.theme.gray9};
  position: absolute;
  top: 0;
  right: -10px;
  box-shadow: -4px -1px 5px rgba(0, 0, 0, 0.15);
`;

const StatusBackground = styled.div`
  background-color: ${(props) => props.theme.color.green};
  position: absolute;
  width: 40px;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.isChecked ? 0 : -30)}px;
  transition: left 0.1s ease-out;
`;

const Checkbox = React.memo(({ isChecked = false, handleClick, name }) => {
  return (
    <Container onClick={() => handleClick && handleClick(name)}>
      <StatusBackground isChecked={isChecked}>
        <Marker />
      </StatusBackground>
    </Container>
  );
});

export default Checkbox;
