// // App.js
// import React, { useState, useEffect } from 'react';
// import DateInput from './components/DateInput';
// import './styles/App.scss';
// import Navbar from './components/Navbar';
// import HeroComponent from './components/HeroComponent';
// import Footer from './components/footer';

// function App() {
//   return (
//     // <div className="App">
//     <>
//       <Navbar />
//       <HeroComponent/>
//       <DateInput />
//       <Footer />
//     </>
//     // </div>
//   );

// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.scss';
import Navbar from './components/Navbar';
import HeroComponent from './components/HeroComponent';
import DateInput from './components/DateInput';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HeroComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dateinput" element={<DateInput />} />
      </Routes>
    </Router>
  );
}

export default App;
