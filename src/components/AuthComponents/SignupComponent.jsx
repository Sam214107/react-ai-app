import React, { useState } from 'react';
import axios from 'axios';
import LoginComponent from './LoginComponent'; // Assuming you have a separate component for Login

const SignupComponent = ({ onClick }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [isSignedUp, setIsSignedUp] = useState(false); // Track signup state

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
      const response = await axios.post('http://localhost:8000/api/report/signup', {
        username, // Match the backend field name
        email,    // Match the backend field name
        password, // Match the backend field name
      });

      if (response.status === 200 || response.status === 201) {
        alert('User registered successfully!');
        setFormData({ username: '', email: '', password: '' });
        setIsSignedUp(true); // Set signed up state to true
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

  const handleGoToLogin = () => {
    setIsSignedUp(false);
  };

  return (
    <div className="col-md-6 d-flex justify-content-center align-items-center">
      
      {isSignedUp ? <LoginComponent /> :

<div className="card shadow-lg p-4 w-75">
<h3 className="text-center mb-4">Create Your Account</h3>
<form onSubmit={handleSignUp}>
  <div className="form-group mb-3">
    <label htmlFor="username" className="form-label">UserName</label>
    <input
      type="text"
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
  <p className="mb-0">Already have an account? <a onClick={handleGoToLogin} className="text-primary">Login</a></p>
</div>
</div>
      
      } {/* Render LoginComponent when signup is successful */}
    </div>
  );
};

export default SignupComponent;
