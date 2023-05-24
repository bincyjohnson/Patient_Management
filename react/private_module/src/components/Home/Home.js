import React from 'react';
import './style.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Aboutus from './Aboutus';
import Service from './Service';
import Testimonials from './Testimonials';
import Contactus from './Contactus';

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
            <Link className="button gradient-bg signup flex fs-4" to="/signup">
              Register
            </Link>
          </div>
        </div>
      </div>

      <div>
        <Aboutus />
      </div>
      <div>
        <Service />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Contactus />
      </div>
    </>
  );
};

export default Home;
