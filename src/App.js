// App.js
import React, { useState, useEffect } from 'react';
import DateInput from './components/DateInput';
import './styles/App.scss';
import Navbar from './components/Navbar';
import HeroComponent from './components/HeroComponent';
import Footer from './components/footer';

function App() {
  return (
    // <div className="App">
    <>
      <Navbar />
      <HeroComponent/>
      <DateInput />
      <Footer />
    </>
    // </div>
  );

}

export default App;
