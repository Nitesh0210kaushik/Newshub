import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const backendURL = 'https://newshub-b0h0.onrender.com'; 

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
            let result = await fetch(`${backendURL}/login`, {
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
                navigate('/');
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
            setError('Error occurred during login.');
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
                        placeholder="Enter email"
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
                            placeholder="Enter password"
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
