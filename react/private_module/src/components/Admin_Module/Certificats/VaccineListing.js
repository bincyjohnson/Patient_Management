import React, { useState, useEffect } from 'react';
import './style.css';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVaccination } from '../actions';
import moment from 'moment';
import { tableStyles, Container, TableContainer } from '../../../tableStyle';
import { Modal } from 'react-bootstrap';
import ConsultVaccine from './ConsultVaccine';

const VaccineListing = () => {
  const dispatch = useDispatch();

  const { listVaccination } = useSelector((state) => state.adminReducer);

  //    modal
  const [modalOpen, setModalOpen] = useState(false);
  const [consultDetail, setConsultDetail] = useState(null);
  const setModal = (id) => {
    setConsultDetail(id);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  const columns = [
    {
      name: 'Email',
      selector: (row) => row?.loginId?.email,
    },
    {
      name: 'Hospital',
      selector: (row) => row?.hospitalId?.hospitalName,
    },
    {
      name: 'Vaccine',
      selector: (row) => row?.vaccineId?.name,
    },
    {
      name: 'Date',
      selector: (row) => moment(row?.date).format('YYYY-MMM-DD'),
    },
    {
      name: 'Time',
      selector: (row) => row?.time,
    },
    {
      name: 'Action',
      selector: (row) => (
        <button className="outline" onClick={() => setModal(row._id)}>
          View
        </button>
      ),
    },
  ];

  const csvData = [
    ['Email', 'Hospital', 'Vaccine', 'Date', 'Time'], // Header row
    ...listVaccination.map((item) => [
      item.loginId.email,
      item.hospitalId.hospitalName,
      item.vaccineId.name,
      item.date,
      item.time,
    ]), // Data rows
  ];

  useEffect(() => {
    dispatch(getAllVaccination());
  }, []);

  return (
    <div className="cmt">
      {/* MODAL */}
      <div>
        <Modal
          show={modalOpen}
          onHide={handleClose}
          className="modal"
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ConsultVaccine id={consultDetail} />
          </Modal.Body>
        </Modal>
      </div>

      {/* DATA TAble */}
      <div className="container mb-5">
        <div className="flex justify-content-end">
          {/* <CSVLink data={csvData} filename={'data.csv'}>
      <button className="button mb-4">Export CSV</button>
    </CSVLink> */}
        </div>
        <Container>
          <TableContainer>
            <DataTable
              columns={columns}
              data={listVaccination}
              customStyles={tableStyles}
              highlightOnHover
              pagination
            />
          </TableContainer>
        </Container>
      </div>
    </div>
  );
};

export default VaccineListing;
