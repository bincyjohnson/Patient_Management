import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  border: 1px solid #7dadde;
  border-radius: 20px;
`;

export const TableContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
export const tableStyles = {
  table: {
    style: {
      marginBottom: '0',
    },
  },
  head: {
    style: {
      backgroundColor: '#6c63ff',
      color: '#fff',
      borderBottom: 'none',
    },
  },
  headCells: {
    style: {
      fontWeight: 'bold',
      backgroundColor: 'lightblue',
      fontSize: '14px',
      padding: '12px',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      padding: '12px',
    },
  },
};
