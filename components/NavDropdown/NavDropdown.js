import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  color: ${props => props.theme.color.white};
  position: relative;
  :hover {
    height: 100%;
  }
`;

const OptionContainer = styled.div`
  position: absolute;
  width: 200px;
  z-index: 200;
  height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  transition: 0.25s;
  ${Container}:hover & {
    border: 1px solid ${props => props.theme.color.green};
    height: ${props => (props.length - 1) * 30}px;
  }
`;

const Option = styled.div`
  width: 200px;
  display: block;
  text-align: center;
  cursor: pointer;
  z-index: 200;
  &:hover {
    background-color: hsla(141, 40%, 4%, 0.7);
    color: ${props => props.theme.color.green};
  }
`;

function Dropdown({ children }) {
  const [sectionTitle, ...dropdownOptions] = children;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container length={children.length}>
      <Option className="dropdown_first_item">{sectionTitle}</Option>
      <OptionContainer length={children.length}>
        {dropdownOptions.map(item => (
          <Option>{item}</Option>
        ))}
      </OptionContainer>
    </Container>
  );
}

export default Dropdown;