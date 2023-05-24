import React, { useEffect } from 'react';
import './style.css';

const NotFound = () => {
  return (
    <>
      <div className="cmt fullbg">
        <div className="row">
          <div className="col-5 flex-c">
            <h1 className="main-head my-5">Oops!! Sorry</h1>
            <h2>Page Not Found</h2>
          </div>
          <div className="col-7">
            <img src="https://cdn.dribbble.com/users/329098/screenshots/6563414/404-ill.jpg?compress=1&resize=768x576&vertical=top" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
