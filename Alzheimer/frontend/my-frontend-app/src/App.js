import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import  HomePage from './HomePage';
import ImageUpload from './ImageUpload';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<ImageUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;