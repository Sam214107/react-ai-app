
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reportImage from '../report.jpg';
import axios from 'axios';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send login request
      const response = await axios.post(
        'http://127.0.0.1:8000/login',
        { identifier, password },
        { withCredentials: true } // Ensures cookies are sent and received
      );

      if (response.status === 200) {
        alert('Login Successful');
        navigate('/DateInput'); // Redirect to DateInput page
      } else {
        alert(response.data.detail || 'Invalid credentials'); // Backend error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section: Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className="text-center mb-4">Welcome To ReportAI</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">UserName or Email</label>
                <input
                  type="text"
                  id="identifier"
                  className="form-control"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="form-check-input"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="form-check-label">Show Password</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account?{' '}
                <span
                  onClick={() => navigate('/signup')} // Navigate to the Sign-Up page
                  className="text-primary"
                  style={{ cursor: 'pointer' }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img 
            src={reportImage} 
            alt="AI Reporting Illustration" 
            className="img-fluid" 
            style={{ maxHeight: '90%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
