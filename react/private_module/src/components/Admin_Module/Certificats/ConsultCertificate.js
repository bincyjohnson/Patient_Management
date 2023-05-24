import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewConsultation, issueConsultationCertificate } from '../actions';
import Web3 from 'web3';
import IssueConsultation from '../../../blockChain/IssueConsultation';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../../actions';
import { RotatingLines } from 'react-loader-spinner';

const ConsultCertificate = ({ id }) => {
  const dispatch = useDispatch();

  const { viewConsult } = useSelector((state) => state.adminReducer);
  const { loader } = useSelector((state) => state.commonReducer);

  useEffect(() => {
    dispatch(viewConsultation(id));
  }, []);

  const handleCertificateIssue = async () => {
    try {
      dispatch(loaderTrue());
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      const decodedData = await IssueConsultation({
        web3,
        address,
        values: {
          patientName: viewConsult?.user?.name,
          patientUUID: viewConsult?.user?.aadhar,
          patientRegId: viewConsult?.user?._id,
          doctorName: viewConsult?.consult?.doctorId?.doctorName,
          consultationTime: new Date(
            `${viewConsult?.consult?.date.slice(
              0,
              10
            )} ${viewConsult?.consult?.time.slice(0, 5)}`
          ).getTime(),
          departmentName: viewConsult?.consult?.departmentId?.departmentName,
          hospitalName: viewConsult?.consult?.hospitalId?.hospitalName,
          issuerName: viewConsult?.consult?.hospitalId?.hospitalName,
          issuerId: viewConsult?.consult?.hospitalId?._id.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });

      dispatch(loaderFalse());
      dispatch(
        issueConsultationCertificate({
          id: viewConsult.consult._id,
          decodedData,
        })
      );
    } catch (err) {
      dispatch(loaderFalse());
      dispatch(setErrorMessage(err.message));
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
          <h2 className="text-center">{viewConsult?.user?.name}</h2>

          <div className="mt-4">
            <div className="row display-row">
              <div className="col-6">Hospital:</div>
              <div className="col-6">
                {viewConsult?.consult?.hospitalId?.hospitalName}
              </div>
            </div>

            <div className="row  display-row">
              <div className="col-6">Date:</div>
              <div className="col-6">
                {new Date(viewConsult?.consult?.date).toLocaleDateString(
                  'en-US',
                  {
                    dateStyle: 'long',
                  }
                )}
              </div>
            </div>

            <div className="row display-row">
              <div className="col-6">Department:</div>
              <div className="col-6">
                {viewConsult?.consult?.departmentId?.departmentName}
              </div>
            </div>

            <div className="row display-row">
              <div className="col-6">Doctor:</div>
              <div className="col-6">
                {viewConsult?.consult?.doctorId?.doctorName}
              </div>
            </div>

            <div className="row display-row">
              <div className="col-6">Time:</div>
              <div className="col-6"> {viewConsult?.consult?.time}</div>
            </div>

            <div className="row display-row">
              <div className="col-6">Payment Status:</div>
              <div className="col-6">
                {viewConsult?.consult?.paymentStatus === 'pending' ? (
                  <span className="text-warning fw-bold">Pending</span>
                ) : (
                  <span className="text-success fw-bold">Completed</span>
                )}
              </div>
            </div>

            {viewConsult?.consult?.certificateStatus === 'completed' ? (
              <div className="flex my-5" onClick={handleCertificateIssue}>
                <button className="button gradient-bg">
                  Issue Certificate
                </button>
              </div>
            ) : viewConsult?.consult?.certificateStatus === 'pending' ? (
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

export default ConsultCertificate;
