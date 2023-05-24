import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container container">
          <div className="row">
            {/* about */}
            <div className="col-12 col-md-6 col-lg-4 flex">
              <div className="footer-about w-75">
                <div className="d-flex mb-4">
                  <img src={require('../../assets/logo.jpg')} width="80" />
                  <h2 className="pt-3 ps-3">Take Care</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus mauris quam, imperdiet ut orci eu, laoreet interdum
                  mauris. Nulla convallis risus a turpis suscipit venenatis.
                </p>
              </div>
            </div>

            {/* useful link */}
            <div className="col-12 col-md-6 col-lg-4 flex">
              <div className="footer-link w-75">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <a>Signup</a>
                </p>
                <p>
                  <a>Gallery</a>
                </p>
                <p>
                  <a>Contact us</a>
                </p>
              </div>
            </div>

            {/* contact */}
            <div className="col-12 col-md-6 col-lg-4 flex">
              <div className="footer-contact w-75">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> TVM
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> takecare@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> 8848265617
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
