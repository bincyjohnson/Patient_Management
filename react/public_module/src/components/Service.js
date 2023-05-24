import React from 'react';

const Service = () => {
  return (
    <div className="">
      <div className="services-container">
        <h1 className="heading">Our Services</h1>
        <div className="services-content">
          <div className="services-item">
            <div className="services-text">
              <h2>Express Delivery</h2>
              <p>
                We provide fast and efficient delivery service that meets your
                deadline. Our experienced drivers ensure your goods are
                delivered safely and on time.
              </p>
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIJN5UIURn3FA4QrdFiuC1vioX1souLDvlF0jju7yDhXzBKCdoJKW7Wci3jt_f1j0fYG0&usqp=CAU"
              alt="Truck"
            />
          </div>
          <div className="services-item">
            <div className="services-text">
              <h2>Logistics Management</h2>
              <p>
                Our logistics team ensures seamless coordination between
                different processes involved .
              </p>
            </div>
            <img
              src="https://www.shutterstock.com/image-photo/big-red-semi-truck-on-260nw-748195210.jpg"
              alt="Truck"
            />
          </div>
          <div className="services-item">
            <div className="services-text">
              <h2>Specialized Transportation</h2>
              <p>
                We offer specialized transportation services for heavy
                equipment, oversized cargo.
              </p>
            </div>
            <img
              src="https://www.shutterstock.com/image-photo/details-dark-semi-truck-on-260nw-537088753.jpg"
              alt="Truck"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
