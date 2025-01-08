import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = ({onClick}) => {

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
        'http://localhost:8000/api/report/login',
        { identifier, password },
       // Ensures cookies are sent and received
      );

      console.log(response)
      // Handle backend response
      const { status, isSucess, message, UserId,SessionId } = response.data;
  
      if (status === 200 && isSucess) {
        alert(message);
        console.log("UserID:", UserId);
        localStorage.setItem('UserId', UserId); // Store UserId in localStorage
        localStorage.setItem('SessionId', SessionId); // Store UserId in localStorage
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert(message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
    }; 

  return (
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
                  onClick={onClick} // Navigate to the Sign-Up page
                  className="text-primary"
                  style={{ cursor: 'pointer' }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
  )
}

export default LoginComponent
