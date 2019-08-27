import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  color: ${props => props.theme.color.white};
  position: relative;
`;

const OptionContainer = styled.div`
  position: absolute;
  width: 200px;
  z-index: 200;
  max-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 0.25s;
  background-color: hsla(141, 25%, 4%, 1);
  ${Container}:hover & {
    border: 1px solid ${props => props.theme.color.green};
    max-height: ${props => props.length * 40}px;
  }
`;

const Option = styled.div`
  height: 30px;
  display: block;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 200;
  &.dropdown_first_item {
    height: 50px;
  }
  &:hover {
    background-color: hsla(141, 25%, 12%, 1);
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    :hover {
      color: ${props => props.theme.color.green};
    }
  }
`;

function Dropdown({ children }) {
  const [firstItem, ...dropdownOptions] = children;
  return (
    <Container length={children.length}>
      <Option className="dropdown_first_item">{firstItem}</Option>
      <OptionContainer length={children.length}>
        {dropdownOptions.map((item, i) => (
          <Option key={item + i}>{item}</Option>
        ))}
      </OptionContainer>
    </Container>
  );
}

export default Dropdown;
