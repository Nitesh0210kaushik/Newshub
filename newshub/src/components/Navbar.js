
import '../App.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const isLoggedIn = Cookies.get('isLoggedIn'); 
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('isLoggedIn'); 
    navigate('/signup');
  };

  return (
    <div>
      {isLoggedIn ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

