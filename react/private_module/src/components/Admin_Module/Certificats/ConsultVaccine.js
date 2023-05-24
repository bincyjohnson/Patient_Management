import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { issueVaccinationCertificate, viewVaccination } from '../actions';
import Web3 from 'web3';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../../actions';
import { RotatingLines } from 'react-loader-spinner';
import IssueVaccination from '../../../blockChain/IssueVaccination';

const ConsultVaccine = ({ id }) => {
  const dispatch = useDispatch();

  const { viewConsult, viewVaccine } = useSelector(
    (state) => state.adminReducer
  );
  const { loader } = useSelector((state) => state.commonReducer);
  console.log(viewVaccine);
  useEffect(() => {
    dispatch(viewVaccination(id));
  }, []);

  const handleCertificateIssue = async () => {
    try {
      dispatch(loaderTrue());
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      const decodedData = await IssueVaccination({
        web3,
        address,
        values: {
          patientName: viewVaccine?.user?.name,
          patientUUID: viewVaccine?.user?.aadhar,
          patientRegId: viewVaccine?.user?._id,
          vaccineName: viewVaccine?.consult?.vaccineId?.vaccineName,
          vaccineTakenDatetime: new Date(
            `${viewVaccine?.consult?.date.slice(
              0,
              10
            )} ${viewVaccine?.consult?.time.slice(0, 5)}`
          ).getTime(),
          disease: viewVaccine?.consult?.vaccineId.disease,
          antigen: viewVaccine?.consult?.vaccineId.antigen,
          issuerName: viewVaccine?.consult?.hospitalId?.hospitalName,
          issuerId: viewVaccine?.consult?.hospitalId?._id.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });

      dispatch(loaderFalse());
      dispatch(
        issueVaccinationCertificate({
          id: viewVaccine.consult._id,
          decodedData,
        })
      );
    } catch (err) {
      dispatch(loaderFalse());
      dispatch(setErrorMessage(err.message));
      console.log(err);
    }
  };

  return (
    <>
      {loader ? (
        <div className="w-100 h-100 flex">
          <RotatingLines
            strokeColor="#7fafdf"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-center">{viewVaccine?.user?.name}</h2>

          <div className="mt-4">
            <div className="row display-row">
              <div className="col-6">Hospital:</div>
              <div className="col-6">
                {viewVaccine?.consult?.hospitalId?.hospitalName}
              </div>
            </div>

            <div className="row  display-row">
              <div className="col-6">Date:</div>
              <div className="col-6">
                {new Date(viewVaccine?.consult?.date).toLocaleDateString(
                  'en-US',
                  {
                    dateStyle: 'long',
                  }
                )}
              </div>
            </div>

            <div className="row display-row">
              <div className="col-6">Time:</div>
              <div className="col-6"> {viewVaccine?.consult?.time}</div>
            </div>

            <div className="row display-row">
              <div className="col-6">Payment Status:</div>
              <div className="col-6">
                {viewVaccine?.consult?.paymentStatus === 'pending' ? (
                  <span className="text-warning fw-bold">Pending</span>
                ) : (
                  <span className="text-success fw-bold">Completed</span>
                )}
              </div>
            </div>

            {viewVaccine?.consult?.certificateStatus === 'completed' ? (
              <div className="flex my-5" onClick={handleCertificateIssue}>
                <button className="button gradient-bg">
                  Issue Certificate
                </button>
              </div>
            ) : viewVaccine?.consult?.certificateStatus === 'pending' ? (
              <div className="flex my-5">
                <button className="button" disabled>
                  Waiting for consultation
                </button>
              </div>
            ) : (
              <div className="flex my-5">
                <button className="button" disabled>
                  Certificate Issued
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultVaccine;
