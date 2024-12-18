
import React, { useState } from 'react';
import axios from 'axios';
import reportImage from '../report.jpg';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    try {
      setLoading(true);
      setError(null);

      // Send POST request to backend
      const response = await axios.post('http://127.0.0.1:8000/signup', {
        username, // Match the backend field name
        email,    // Match the backend field name
        password, // Match the backend field name
      });

      if (response.status === 200 || response.status === 201) {
        alert('User registered successfully!');
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (err) {
      // Capture the error message sent by backend
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow-lg p-4 w-75">
            <h3 className="text-center mb-4">Create Your Account</h3>
            <form onSubmit={handleSignUp}>
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">UserName</label>
                <input
                  type="Username"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Enter your UserName"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="text-center mt-3">
              <p className="mb-0">Already have an account? <a href="/login" className="text-primary">Login</a></p>
            </div>
          </div>
        </div>
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

export default SignUpPage;
