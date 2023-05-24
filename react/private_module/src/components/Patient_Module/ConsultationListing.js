import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConsultation } from './actions';
import DataTable from 'react-data-table-component';
import { tableStyles, Container, TableContainer } from '../../tableStyle';
import ConsultView from './ConsultView';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

const ConsultationListing = () => {
  const dispatch = useDispatch();

  const { allConsultation } = useSelector((state) => state.patientReducer);

  //    modal
  const [modalOpen, setModalOpen] = useState(false);
  const [consultDetail, setConsultDetail] = useState(null);

  const handleClose = () => setModalOpen(false);

  const setModal = (id) => {
    setConsultDetail(allConsultation.find((consult) => consult._id === id));
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllConsultation());
  }, []);

  const columns = [
    {
      name: 'Hospital',
      selector: (row) => row?.hospital?.hospitalName,
    },
    {
      name: 'Doctor',
      selector: (row) => row?.doctor?.doctorName,
    },
    {
      name: 'Date',
      selector: (row) => moment(row?.date).format('MMMM DD, YYYY'),
    },
    {
      name: 'Time',
      selector: (row) => row?.time,
    },
    {
      name: 'Status',
      selector: (row) => (
        <div className="statusbar">
          <span
            className={
              row.certificateStatus === 'pending'
                ? `activebar waitingbar alert`
                : `activebar alert`
            }
          >
            {row.certificateStatus === 'pending' ? `Pending` : `Completed`}
          </span>
        </div>
      ),
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
            <ConsultView detail={consultDetail} />
          </Modal.Body>
        </Modal>
      </div>

      {/* DATA TABLE */}
      <div className="container mt-5">
        <Container>
          <TableContainer>
            <DataTable
              columns={columns}
              data={allConsultation}
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
