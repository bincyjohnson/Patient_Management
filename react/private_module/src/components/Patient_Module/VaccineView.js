import React from 'react';

const VaccineView = ({ detail }) => {
  return (
    <>
      <div className="modal-content">
        <>
          <div>
            <h2 className="text-center">{detail?.hospitalId?.hospitalName}</h2>

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
                <div className="col-6">Vaccine:</div>
                <div className="col-6">{detail.vaccineId.name}</div>
              </div>

              <div className="row display-row">
                <div className="col-6">Time:</div>
                <div className="col-6"> {detail.time}</div>
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
      </div>
    </>
  );
};

export default VaccineView;
