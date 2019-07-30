import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-size: 20px;
`;

const Section = styled.div`
  flex: ${props => props.width};
`;

function MusicLibraryTitle({ columns, className }) {
  // console.log('IN TITLE ROW', columns);
  return (
    <Container className={className}>
      {columns.map((column, idx) => (
        <Section key={`row-title-${idx}`} width={column.width || 1}>
          {column.name}
        </Section>
      ))}
    </Container>
  );
}

export default MusicLibraryTitle;
