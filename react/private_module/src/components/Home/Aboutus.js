import React from 'react';

const Aboutus = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-6 col-lg-6">
            <div className="about-img">
              <img src="https://preview.colorlib.com/theme/medico/img/top_service.png.webp" />
            </div>
          </div>
          <div className="col-md-6 col-lg-5">
            <div className="about-text">
              <h2 className="mb-3">About us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
                ipsum suspendisse ultrices gravida. Risus cmodo viverra maecenas
                accumsan lacus vel
              </p>
              <div className="banner-item mt-4">
                <div className="single-item flex-c">
                  <img src="https://preview.colorlib.com/theme/medico/img/icon/banner_1.svg" />
                  <h5>Emergency</h5>
                </div>
                <div className="single-item flex-c">
                  <img src="https://preview.colorlib.com/theme/medico/img/icon/banner_2.svg" />
                  <h5>Appointment</h5>
                </div>
                <div className="single-item flex-c">
                  <img src="https://preview.colorlib.com/theme/medico/img/icon/banner_3.svg" />
                  <h5>Qualified</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
