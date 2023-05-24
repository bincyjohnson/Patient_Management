import React, { useState, useEffect } from 'react';
import './style.css';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConsultation } from '../actions';
import moment from 'moment';
import { tableStyles, Container, TableContainer } from '../../../tableStyle';
import { Modal } from 'react-bootstrap';
import ConsultCertificate from './ConsultCertificate';

const ConsultationListing = () => {
  const dispatch = useDispatch();

  const { listConsultation } = useSelector((state) => state.adminReducer);

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
      width: '200px',
    },
    {
      name: 'Hospital',
      selector: (row) => row?.hospitalId?.hospitalName,
      width: '250px',
    },
    {
      name: 'Department',
      selector: (row) => row?.departmentId?.departmentName,
      width: '150px',
    },
    {
      name: 'Date',
      selector: (row) => moment(row?.date).format('YYYY-MMM-DD'),
    },
    {
      name: 'Consultation',
      selector: (row) => (
        <div className="statusbar">
          <span
            className={
              row.certificateStatus === 'pending'
                ? `waitingbar alert`
                : ` activebar alert`
            }
          >
            {row.certificateStatus === 'pending' ? `Pending` : `Completed`}
          </span>
        </div>
      ),
    },
    {
      name: 'Certificate',
      selector: (row) => {
        if (row.certificateStatus === 'pending')
          return <span className="text-warning">Pending</span>;
        else if (row.certificateStatus === 'completed')
          return <span className="text-info">Waiting</span>;
        else return <span className="text-success">Issued</span>;
      },
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
    ['Email', 'Hospital', 'Department', 'Doctor', 'Date', 'Time', 'Status'], // Header row
    ...listConsultation.map((item) => [
      item.loginId.email,
      item.hospitalId.hospitalName,
      item.departmentId.departmentName,
      item.doctorId.doctorName,
      item.date,
      item.time,
      item.status,
    ]), // Data rows
  ];

  useEffect(() => {
    dispatch(getAllConsultation());
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
            <ConsultCertificate id={consultDetail} />
          </Modal.Body>
        </Modal>
      </div>

      {/* DATA TABLE */}
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
              data={listConsultation}
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

export default ConsultationListing;
