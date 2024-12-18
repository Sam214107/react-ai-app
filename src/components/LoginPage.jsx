import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reportImage from '../report.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success
    if (email === 'user@example.com' && password === 'password') {
      alert('Login Successful');
      navigate('/DateInput'); // Redirect to DateInput page
    } else {
      alert('Invalid credentials');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Logic to handle forgot password
    console.log("Password reset email sent to:", resetEmail);
    setShowForgotPassword(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section: Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center ">
          <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className="text-center mb-4">Welcome To ReportAI</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
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
                  <input type="checkbox" id="remember" className="form-check-input" />
                  <label htmlFor="remember" className="form-check-label">Remember Me</label>
                </div>
                <button type="button" className="btn btn-link p-0" onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="text-center mt-3">
              {/* <p className="mb-0">Don't have an account? <a href="#!" className="text-primary">Sign Up</a></p> */}
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
            <div>
              {/* Forgot Password Modal */}
              {showForgotPassword && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Reset Password</h5>
                        <button type="button" className="btn-close" onClick={() => setShowForgotPassword(false)}></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleForgotPassword}>
                          <div className="form-group mb-3">
                            <label htmlFor="resetEmail" className="form-label">Email Address</label>
                            <input
                              type="email"
                              id="resetEmail"
                              className="form-control"
                              placeholder="Enter your email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
