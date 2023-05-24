import React, { useState } from 'react';
import './index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounts } from '../../actions';

const PatientDashboard = (props) => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.commonReducer);
  console.log(count);
  // let data = async () => {
  //   let a = await getData('/vehicle/count');
  //   console.log(a);
  //   return a;
  // };
  // console.log(data);

  // useEffect(() => {
  //   dispatch(getCounts());
  // }, []);

  return (
    <>
      <div className="cmt">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a
                className="datcard my-3"
                // href="/AuburnAnswers/Admin/ManageCategory"
              >
                <span style={{ color: 'white' }} className="h4 fs-2">
                  Consultations
                </span>
                <div className="flex count">0</div>
                <div className="go-corner"></div>
              </a>
            </div>

            <div className="col-md-3">
              <a
                className="datcard my-3"
                // href="/AuburnAnswers/Admin/ManageCategory"
              >
                <span style={{ color: 'white' }} className="h4 fs-2">
                  Vaccinations
                </span>
                <div className="flex count">0</div>
                <div className="go-corner"></div>
              </a>
            </div>

            <div className="col-md-3">
              <a
                className="datcard my-3"
                // href="/AuburnAnswers/Admin/ManageCategory"
              >
                <span style={{ color: 'white' }} className="h4 fs-2">
                  Diseases
                </span>
                <div className="flex count">0</div>
                <div className="go-corner"></div>
              </a>
            </div>

            <div className="col-md-3">
              <a
                className="datcard my-3"
                // href="/AuburnAnswers/Admin/ManageCategory"
              >
                <span style={{ color: 'white' }} className="h4 fs-3">
                  Payments
                </span>
                <div className="flex count">0</div>
                <div className="go-corner"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
