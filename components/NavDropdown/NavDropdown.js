import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.width || 200}px;
  position: relative;
`;

const OptionContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 200;
  max-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 0.25s;
  background-color: hsla(141, 25%, 4%, 1);
  ${Container}:hover & {
    border: 1px solid ${(props) => props.theme.color.green};
    max-height: ${(props) => props.length * 40}px;
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
  flex: 1;
  padding: 0.25rem 0;
  :first-child {
    height: 100%;
  }

  &:hover :not(:first-child) {
    background-color: hsla(141, 25%, 12%, 1);
    * {
      color: ${(props) => props.theme.color.green};
    }
  }
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${(props) => props.theme.color.white};
    text-decoration: none;
  }
`;

function Dropdown({ children, className, multi, width }) {
  const flattenedChildren = children.flat(Infinity);
  const [firstItem, ...dropdownOptions] = flattenedChildren;
  return (
    <Container className={className} width={width}>
      <Option>{firstItem}</Option>
      <OptionContainer length={flattenedChildren.length + 1}>
        {dropdownOptions.map((item, i) => (
          <Option key={item + i}>{item}</Option>
        ))}
      </OptionContainer>
    </Container>
  );
}

export default Dropdown;
