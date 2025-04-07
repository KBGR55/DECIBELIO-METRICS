import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Metric from './fragment/Metric';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Metric />} />
      </Routes>
    </div>
  );
}

export default App;
