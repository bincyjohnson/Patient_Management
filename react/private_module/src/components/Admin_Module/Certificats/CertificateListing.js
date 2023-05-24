import React, { useState } from 'react';
import './style.css';
import ConsultationListing from './ConsultationListing';
import VaccineListing from './VaccineListing';

const CertificateListing = () => {
  const [isConsultationActive, setIsConsultationActive] = useState(true);

  const handleConsultation = () => {
    setIsConsultationActive(true);
  };

  const handleVaccine = () => {
    setIsConsultationActive(false);
  };

  return (
    <div className="cmt">
      <h1 className="heading">Appointments</h1>
      {/* buttons */}
      <div className="flex">
        <div className="row d-flex toggle-wrapper rounded">
          <div
            className={`col-6 flex toglebtn ${
              isConsultationActive ? 'active' : ''
            }`}
            onClick={handleConsultation}
          >
            Consultation
          </div>
          <div
            className={`col-6 flex toglebtn ${
              !isConsultationActive ? 'active' : ''
            }`}
            onClick={handleVaccine}
          >
            Vaccination
          </div>
        </div>
      </div>

      {/* components */}
      {isConsultationActive ? <ConsultationListing /> : <VaccineListing />}
    </div>
  );
};

export default CertificateListing;
