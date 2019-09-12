import styled, { withTheme } from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.width};
  position: relative;
  margin: auto 0;
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
  background-color: ${(props) => props.bg};
  ${Container}:hover & {
    border: 1px solid ${(props) => props.border};
    max-height: 90vh;
  }
`;

const Option = styled.div`
  height: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 200;
  flex: 1;

  :not(.dropdown_label) {
    padding: 3px 0;
  }

  * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-decoration: none;
  }
`;

function Dropdown({ theme, children, className, width = '200px', borderColor, bg }) {
  const flattenedChildren = children.reduce((acc, item) => acc.concat(item), []);
  const [firstItem, ...dropdownOptions] = flattenedChildren;
  return (
    <Container className={className} width={width}>
      <Option className="dropdown_label">{firstItem}</Option>
      <OptionContainer border={borderColor || theme.color.green} bg={bg || theme.color.library}>
        {dropdownOptions.map((option, i) => {
          return <Option key={`dropdown-${option + i}`}>{option}</Option>;
        })}
      </OptionContainer>
    </Container>
  );
}

export default withTheme(Dropdown);
