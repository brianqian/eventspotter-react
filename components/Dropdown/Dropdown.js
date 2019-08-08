import styled from 'styled-components';

const Container = styled.div`
  width: 100px;
  border: 1px solid pink;
`;

const Option = styled.div`
  width: 100px;
  border: 1px solid black;
`;

function Dropdown({ options = ['item1', 'item2', 'item3'] }) {
  return (
    <Container>
      {options.map(option => (
        <Option>{option}</Option>
      ))}
    </Container>
  );
}

export default Dropdown;
