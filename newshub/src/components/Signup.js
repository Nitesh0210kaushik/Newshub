import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../App.css';

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Add this state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userName,
      email,
      password,
      confirmPassword,
      phone,
      age,
      gender,
    };

    const validationErrors = validateFormData(formData);

    if ((validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        let result = await fetch("http://localhost:8000/signup", {
          method: 'post',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        result = await result.json();
        console.warn(result);
        Cookies.remove('isLoggedIn');
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.userName.trim()) {
      errors.userName = 'Username is required.';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format.';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required.';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!data.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!data.age.trim()) {
      errors.age = 'Age is required.';
    }
    if (!data.gender) {
      errors.gender = 'Gender is required.';
    }
    return errors;
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>User Registration Page</h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder='enter username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <p>{errors.userName}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder='enter-email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder='enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <div>
          <label>Age</label>
          <input
            type="text"
            name="age"
            placeholder='enter age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <div>
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
