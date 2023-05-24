import React, { useEffect, useState } from 'react';
import './style.css';
import {
  vaccineValidation,
  vaccineVariable,
} from '../../validations/VaccineValidation';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHospital, getAllVaccine, bookVaccine } from './actions';

import Web3 from 'web3';
import { loaderFalse, loaderTrue, setErrorMessage } from '../../actions';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from 'react-bootstrap';

const VaccineRegistration = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const { hospitals, vaccine } = useSelector((state) => state.patientReducer);
  const { loader } = useSelector((state) => state.commonReducer);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const TimeDropdown = () => {
    // Generate an array of time options
    const timeOptions = [];

    for (let hour = 9; hour <= 12; hour++) {
      timeOptions.push(`${hour}:00 AM`);
    }

    for (let hour = 1; hour <= 5; hour++) {
      timeOptions.push(`${hour}:00 PM`);
    }

    return timeOptions;
  };

  const [formValue, setFormValue] = useState(vaccineVariable);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
    dispatch(setErrorMessage('Transaction is cancelled'));
  };
  const setModal = () => setModalOpen(true);

  useEffect(() => {
    dispatch(getAllHospital());
    dispatch(getAllVaccine());
  }, []);

  // Validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldSchema = vaccineValidation.extract(name);
    const { error } = fieldSchema.validate(value);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = vaccineValidation.validate(formValue, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors((prevState) => ({ ...prevState, ...newErrors }));
    } else {
      setModal();
    }
  };

  // make payment
  const metaMaskPayment = async () => {
    setModalOpen(false);
    try {
      dispatch(loaderTrue());
      // Meatamask transation
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();

      const tokenAddress = '0x72d46adf628719E83c67D1a3b91743f382355308';

      const toWei = async (web3, amount, decimals) => {
        return await web3.utils.toWei(
          parseFloat(amount).toFixed(decimals).toString(),
          'ether'
        );
      };

      const getGasPrice = async (web3) => {
        const gasPrice = await web3.eth.getGasPrice();
        return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
      };

      const AmountInWei = await toWei(web3, 0, 18);
      const GetGasPricesss = await getGasPrice(web3);

      if (netVer === 80001) {
        const result = await web3.eth.sendTransaction({
          from: accounts[0],
          to: tokenAddress,
          value: AmountInWei,
          GetGasPricesss,
        });
        dispatch(loaderFalse());

        if (result) {
          dispatch(bookVaccine(formValue, result));
        }
      } else {
        dispatch(loaderFalse());
        dispatch(setErrorMessage('Mumbai network only supported Now'));
      }
    } catch (error) {
      dispatch(loaderFalse());
      if (error.code === 4001) {
        dispatch(
          setErrorMessage(
            ' MetaMask transaction rejected. Your booking is cancelled'
          )
        );
      }
    }
  };
  return (
    <>
      {/* MODAL */}
      <div>
        <Modal
          show={modalOpen}
          onHide={handleClose}
          className="modal"
          backdrop="static"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center">
            <h3 className="heading my-3 ">Make Payment</h3>
            <p className="fs-5 pt-3">
              For the completion of appointment <br /> please make the Metamask
              transaction
              <br /> <span className="text-danger fs-3">Rs. 500</span>
            </p>
            <button
              className=" my-5 button gradient-bg"
              onClick={metaMaskPayment}
            >
              Make Payment
            </button>
          </Modal.Body>
        </Modal>
      </div>

      {/* CONTAINER */}
      <div className="consult-section container my-5 ">
        {loader ? (
          <div className="hero-wrapper flex">
            <RotatingLines
              strokeColor="#7fafdf"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <div className="main-wrap">
            <form onSubmit={handleSubmit}>
              <div className="flex-c flex-wrap justify-content-between mt-3">
                {/* hospital */}
                <div className="w-2 flex">
                  <div className="formfield" id="input_field">
                    <select
                      name="hospitalId"
                      value={formValue.hospitalId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="my-select"
                      id="hospitalId"
                    >
                      <option>Select one hospital</option>
                      {hospitals.map((item, index) => (
                        <option value={item._id} key={index}>
                          {item.hospitalName}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="hospital">Hospital</label>
                  </div>
                </div>
                {errors.hospitalId && (
                  <span className="error ps-5">{errors.hospitalId}</span>
                )}
                {/* vaccine */}
                <div className="w-2 flex">
                  <div className="formfield" id="input_field">
                    <select
                      name="vaccineId"
                      value={formValue.vaccineId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="my-select"
                      id="department"
                    >
                      <option>Select one vaccine</option>
                      {vaccine.map((item, index) => (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="department">Vaccine</label>
                  </div>
                </div>
                {errors.vaccineId && (
                  <span className="error ps-5">{errors.vaccineId}</span>
                )}
              </div>

              <div className="flex-c flex-wrap justify-content-around ">
                {/* date */}
                <div className="w-2 flex">
                  <div className="formfield" id="input_field">
                    <DatePicker
                      selected={formValue.date}
                      onChange={(date) =>
                        setFormValue({ ...formValue, date: date })
                      }
                      className="datefield"
                      placeholderText="Pick the date"
                      minDate={tomorrow}
                    />
                  </div>
                </div>

                {/* time */}
                <div className="w-2 flex">
                  <div className="formfield" id="input_field">
                    <select
                      name="time"
                      value={formValue.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="my-select"
                      id="time"
                    >
                      <option>Select one time</option>
                      {TimeDropdown().map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="time">Time</label>
                  </div>
                </div>
                {errors.time && (
                  <span className="error ps-5">{errors.time}</span>
                )}
              </div>

              <div className="flex mt-3">
                <button type="submit" className="button gradient-bg ms-5">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default VaccineRegistration;
