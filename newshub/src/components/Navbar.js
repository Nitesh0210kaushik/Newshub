

import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSignOutAlt, faUser, faHome, faClock } from '@fortawesome/free-solid-svg-icons'; // Import icon components



const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isLoggedIn = Cookies.get('isLoggedIn'); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const logout = () => {
    Cookies.remove('isLoggedIn'); 
    navigate('/signup');
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="navbar">
      <div className="nav-left">
        {isLoggedIn && (
          <ul className="nav-ul">
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Homepage
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="nav-right">
        <ul className="nav-ul">
          {isLoggedIn ? (
            <>
              <li>
                <FontAwesomeIcon icon={faClock} /> {formattedTime}
              </li>
              <li>
                <FontAwesomeIcon icon={faUser} /> {isLoggedIn}
              </li>
              <li>
                <Link onClick={logout} to="/signup">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

