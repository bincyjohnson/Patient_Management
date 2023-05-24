import React, { useState } from 'react';
import Web3 from 'web3';
import { consultationVerify } from '../../blockChain/consultationVerify';
import { vaccinationVerify } from '../../blockChain/vaccinationVerify';

const Verification = () => {
  const [consultNumber, setConsultNumber] = useState('');
  const [vaccineNumber, setVaccineNumber] = useState('');
  const web3 = new Web3(window.ethereum);

  // verify consultation certificate
  const verifyConsultation = async (e) => {
    e.preventDefault();

    let result = await consultationVerify({
      web3,
      certificateNumber: consultNumber,
    });
    alert(result);
    console.log(result);
  };

  //   verify vaccination certificate
  const verifyVaccination = async (e) => {
    e.preventDefault();
    await window.ethereum.enable();

    let result = await vaccinationVerify({
      web3,
      certificateNumber: vaccineNumber,
    });
    alert(result);
    console.log(result);
  };
  return (
    <>
      <div className="verification-section cmt">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="text-center service-heading mb-5">
                <h2>Verify Certificates</h2>
              </div>
            </div>
          </div>

          <div className="container">
            <h3 className="text-center heading fs-4">Verify Consultation</h3>
            <form className="form-search flex" onSubmit={verifyConsultation}>
              <input
                className="form-control w-50 py-3"
                placeholder="Consultation Certificate Number"
                onChange={(e) => setConsultNumber(e.target.value)}
                value={consultNumber}
              />
              <button type="submit" className="subbtn py-3">
                Verify
              </button>
            </form>
          </div>

          <div className="container my-5">
            <h3 className="text-center heading fs-4">Verify Vaccination</h3>
            <form className="form-search flex" onSubmit={verifyVaccination}>
              <input
                className="form-control w-50 py-3"
                placeholder="Vaccination Certificate Number"
                onChange={(e) => setVaccineNumber(e.target.value)}
                value={vaccineNumber}
              />
              <button type="submit" className="subbtn py-3">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
