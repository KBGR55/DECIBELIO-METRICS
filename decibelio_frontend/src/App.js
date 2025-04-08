import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Metric from './fragment/Metric';
import Footer from './fragment/Footer'; 

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Routes>
        <Route path="/" element={<Metric />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;
