import React, { useState } from 'react';
import './style.css';
import ConsultationRegistration from './ConsultationRegistration';
import VaccineRegistration from './VaccineRegistration';

const AppointmentListing = () => {
  const [isConsultationActive, setIsConsultationActive] = useState(true);

  const handleConsultation = () => {
    setIsConsultationActive(true);
  };

  const handleVaccine = () => {
    setIsConsultationActive(false);
  };

  return (
    <div className="cmt">
      <h1 className="heading">Registration</h1>
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
      {isConsultationActive ? (
        <ConsultationRegistration />
      ) : (
        <VaccineRegistration />
      )}
    </div>
  );
};

export default AppointmentListing;
