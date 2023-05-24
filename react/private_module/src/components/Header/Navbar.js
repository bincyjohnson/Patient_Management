import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions';

const Navbar = () => {
  const { islogin, role, permission } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [navbarMenuClass, setNavbarMenuClass] = useState('navbar-links');

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleNavbarLinkClick = (event) => {
    event.stopPropagation();
  };

  const handleNavbarMenuClick = () => {
    setIsNavbarOpen(false);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <header id="navbar">
        <nav className="navbar-container container">
          <a href="http://localhost:3456/" className="home-link">
            <img
              src={require('../../assets/logo.jpg')}
              width="90px"
              height="60px"
            />
          </a>
          <button
            type="button"
            id="navbar-toggle"
            aria-controls="navbar-menu"
            aria-label="Toggle menu"
            aria-expanded={isNavbarOpen ? 'true' : 'false'}
            className="navbar-toggle"
            onClick={handleNavbarToggle}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div
            id="navbar-menu"
            aria-labelledby="navbar-toggle"
            className={`navbar-toggle ${
              isNavbarOpen ? 'opened' : ''
            } ${navbarMenuClass}`}
            onClick={handleNavbarMenuClick}
          >
            <ul className="navbar-links " onClick={handleNavbarLinkClick}>
              {!islogin ? (
                <>
                  <li className="navbar-item">
                    <Link className="navbar-link" to={'/'}>
                      Home
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <a
                      className="navbar-link"
                      href="http://localhost:3456/gallery"
                    >
                      About us
                    </a>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/service">
                      Service
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/service">
                      Testimonials
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <a
                      className="navbar-link"
                      href="http://localhost:3456/contact_us"
                    >
                      Contact us
                    </a>
                  </li>

                  <li className="navbar-item">
                    <Link className="navbar-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {role === 'Patient' ? (
                    <>
                      <li className="navbar-item">
                        <Link className="navbar-link" to={'/patientDashboard'}>
                          Dashboard
                        </Link>
                      </li>

                      <li className="navbar-item">
                        <Link className="navbar-link" to="/appointment">
                          Appointment
                        </Link>
                      </li>

                      <li className="navbar-item">
                        <Link className="navbar-link" to="/history">
                          History
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="navbar-item">
                        <Link className="navbar-link" to={'/dashboard'}>
                          Dashboard
                        </Link>
                      </li>

                      <li className="navbar-item">
                        <Link className="navbar-link" to="/certificate">
                          Appointment
                        </Link>
                      </li>

                      {/* <li className="navbar-item">
                        <Link className="navbar-link" to="/patients">
                          Patients
                        </Link>
                      </li> */}

                      {/* <li className="navbar-item">
                        <Link className="navbar-link" to="/messages">
                          Payment
                        </Link>
                      </li> */}

                      <li className="navbar-item">
                        <Link className="navbar-link" to="/messages">
                          Messages
                        </Link>
                      </li>

                      {/* <li className="navbar-item">
                        <Link className="navbar-link" to="/messages">
                          Profile
                        </Link>
                      </li> */}
                    </>
                  )}

                  {/* <li
                    className="navbar-item"
                    onClick={() => dispatch(logout())}
                  >
                    <Link className="navbar-link" to="/messages">
                      Logout
                    </Link>
                  </li> */}
                  {/* uyhoihlujluououi */}
                  <div className="profile-dropdown">
                    <button
                      className="profile-button"
                      onClick={handleMenuToggle}
                    >
                      <img
                        src="https://png.pngtree.com/png-clipart/20220911/original/pngtree-female-doctor-avatar-icon-illustration-png-image_8537697.png"
                        width={50}
                      />
                    </button>
                    {showMenu && (
                      <ul className="dropdown-menu">
                        {/* Dropdown menu options */}
                        <li>
                          <Link to="/messages">Profile</Link>
                        </li>
                        <li onClick={() => dispatch(logout())}>
                          <Link to="/messages">Logout</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
