import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from './actions';
import './style.css';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import MessageView from './MessageView';
import DataTable from 'react-data-table-component';
import { tableStyles, Container, TableContainer } from '../../tableStyle';
import { CSVLink } from 'react-csv';
import moment from 'moment';

const MessageListing = () => {
  const { messages } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  console.log('messages', messages);
  //   modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (id) => {
    setSelected(id);
    setModalOpen(true);
  };
  const handleClose = () => {
    dispatch(getAllMessages());
    setModalOpen(false);
  };
  const [selected, setSelected] = useState('');

  useEffect(() => {
    dispatch(getAllMessages());
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: (row) => (
        <span className={row.status === 'unread' ? `unread` : 'read'}>
          {row?.name}
        </span>
      ),
    },
    {
      name: 'Email',
      selector: (row) => (
        <span className={row.status === 'unread' ? `unread` : 'read'}>
          {row?.email}
        </span>
      ),
    },
    {
      name: 'Message',
      selector: (row) => (
        <span className={row.status === 'unread' ? `unread` : 'read'}>
          {row?.message}
        </span>
      ),
    },
    {
      name: 'Date',
      selector: (row) => (
        <span className={row.status === 'unread' ? `unread` : 'read'}>
          {moment(row?.createdAt).format('DD-MMM-YYYY')}
        </span>
      ),
    },
    {
      name: 'Action',
      selector: (row) => (
        <button
          className={row.status === 'unread' ? `unread outline` : 'outline'}
          onClick={() => handleClick(row._id)}
        >
          View
        </button>
      ),
    },
  ];

  const csvData = [
    ['Name', 'Email', 'Message', 'Date'], // Header row
    ...messages.map((item) => [
      item.name,
      item.email,
      item.message,
      item.createdAt,
    ]), // Data rows
  ];

  return (
    <>
      <div className="container msg_container cmt">
        <h1 className="heading">Messages</h1>

        {/* MODAL */}
        <div>
          <Modal
            show={modalOpen}
            onHide={handleClose}
            className="modal"
            backdrop="static"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <MessageView id={selected} />
            </Modal.Body>
          </Modal>
        </div>

        {/* DATA TABLE */}
        <div className="container mb-5">
          <div className="flex justify-content-end">
            <CSVLink data={csvData} filename={'data.csv'}>
              <button className="button mb-4">Export CSV</button>
            </CSVLink>
          </div>
          <Container>
            <TableContainer>
              <DataTable
                columns={columns}
                data={messages}
                customStyles={tableStyles}
                highlightOnHover
                pagination
                striped
              />
            </TableContainer>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MessageListing;
