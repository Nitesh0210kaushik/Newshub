import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import the eye icons

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch('http://localhost:8000/login', {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.status === 200) {
        const response = await result.json();
        console.log('Login successful:', response);
        Cookies.set('isLoggedIn', true);

        navigate('/'); // Redirect to the homepage after successful login
      } else if (result.status === 401) {
        console.log('Invalid email or password.');
        setError('Invalid email or password.');
      } else {
        console.log('Error occurred during login.');
        setError('Error occurred during login.'); 
      }
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred during login.'); // Set error message for network errors
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
