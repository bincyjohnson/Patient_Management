import React from 'react';
import DataTable from 'react-data-table-component';
import './style.css';
import styled from 'styled-components';

const PatientListing = () => {
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Year',
      selector: (row) => row.year,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <div className="status">
          <span
            className={
              row.status === 'approved'
                ? `active alert`
                : row.status === 'pending'
                ? `waiting alert`
                : `reject alert`
            }
          >
            {row.status === 'approved'
              ? `active`
              : row.status === 'pending'
              ? `pending`
              : `rejected`}
          </span>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      status: 'approved',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
      status: 'pending',
    },
  ];

  const Container = styled.div`
    background-color: #f5f5f5;
    color: #333;
    padding: 20px;
    border: 1px solid #7dadde;
    border-radius: 20px;
  `;

  const TableContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `;
  const tableStyles = {
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

  return (
    <div className="cmt">
      <div className="flex">
        <h1 className="heading">Patients</h1>
      </div>
      <div className="container">
        <Container>
          <TableContainer>
            <DataTable
              columns={columns}
              data={data}
              customStyles={tableStyles}
              highlightOnHover
            />
          </TableContainer>
        </Container>
      </div>
    </div>
  );
};

export default PatientListing;
