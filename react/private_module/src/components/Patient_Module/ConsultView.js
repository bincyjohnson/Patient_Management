import React from 'react';
import {
  PDFDownloadLink,
  Document,
  Page,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '50%',
    fontWeight: 'bold',
  },
  value: {
    width: '50%',
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* {modalData()} */}
      <h1>hi</h1>
    </Page>
  </Document>
);

const ConsultView = ({ detail }) => {
  const handleDownload = () => {
    const filename = 'consultation.pdf';

    return (
      <PDFDownloadLink document={<MyDocument />} fileName={filename}>
        {({ loading }) => (loading ? 'Loading document...' : 'Download')}
      </PDFDownloadLink>
    );
  };

  const modalData = () => {
    return (
      <>
        <div>
          <h2 className="text-center">{detail.hospital.hospitalName}</h2>

          <div className="mt-4">
            <div className="row  display-row">
              <div className="col-6">Date:</div>
              <div className="col-6">
                {new Date(detail.date).toLocaleDateString('en-US', {
                  dateStyle: 'long',
                })}
              </div>
            </div>

            <div className="row display-row">
              <div className="col-6">Department:</div>
              <div className="col-6">{detail.department.departmentName}</div>
            </div>

            <div className="row display-row">
              <div className="col-6">Doctor:</div>
              <div className="col-6">{detail.doctor.doctorName}</div>
            </div>

            <div className="row display-row">
              <div className="col-6">Time:</div>
              <div className="col-6"> {detail.time}</div>
            </div>

            <div className="row display-row">
              <div className="col-6">Status:</div>
              <div className="col-6">
                {detail.status === 'pending' ? (
                  <span className="text-warning fw-bold">Pending</span>
                ) : (
                  <span className="text-success fw-bold">Completed</span>
                )}
              </div>
            </div>

            <div className="row display-row">
              <div className="col-6">Certificate:</div>
              <div className="col-6">
                {detail.certificateStatus === 'pending'
                  ? 'Consultation pending'
                  : detail.certificateStatus === 'completed'
                  ? 'Waiting for approval'
                  : 'Certificate Issued'}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="modal-content">
        {modalData()}
        <div className="row display-row">
          <button className="btn btn-secondary mt-5" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default ConsultView;
