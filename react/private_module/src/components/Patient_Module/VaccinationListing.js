import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVaccination } from './actions';
import DataTable from 'react-data-table-component';
import { tableStyles, Container, TableContainer } from '../../tableStyle';
import ConsultView from './ConsultView';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import VaccineView from './VaccineView';

const VaccinationListing = () => {
  const dispatch = useDispatch();

  const { allVaccination } = useSelector((state) => state.patientReducer);

  //    modal
  const [modalOpen, setModalOpen] = useState(false);
  const [vaccineDetail, setVaccineDetail] = useState(null);

  const handleClose = () => setModalOpen(false);

  const setModal = (id) => {
    setVaccineDetail(allVaccination.find((consult) => consult._id === id));
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllVaccination());
  }, []);

  const columns = [
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

  return (
    <div>
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
            <VaccineView detail={vaccineDetail} />
          </Modal.Body>
        </Modal>
      </div>

      {/* DATA TABLE */}
      <div className="container mt-5">
        <Container>
          <TableContainer>
            <DataTable
              columns={columns}
              data={allVaccination}
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

export default VaccinationListing;
