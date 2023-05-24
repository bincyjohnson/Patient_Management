import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Aboutus from './Aboutus';
import Service from './Service';
import Testimonials from './Testimonials';
import Contactus from './Contactus';
import Verification from './Verification';

const Home = () => {
  return (
    <>
      <div className="home-container cmt">
        {/* <div className="home-overlay"></div> */}
        <div className="home-section p-5 mt-4 h-75 flex-c">
          <span className="home-text">The Best Medical Service</span>
          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum.
            Ut ac ligula sapien. Suspendisse cursus faucibus finibus.
          </p>
          <div className="flex mt-4">
            <a
              className="button gradient-bg signup flex fs-4"
              href={`http://localhost:3457/signup`}
            >
              Register
            </a>
          </div>
        </div>
      </div>

      <div id="aboutus">
        <Aboutus />
      </div>
      <div id="service">
        <Service />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="verification">
        <Verification />
      </div>
      <div id="contactus">
        <Contactus />
      </div>
    </>
  );
};

export default Home;
