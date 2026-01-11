import React from 'react';
import { Link } from 'react-router-dom';



export function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Early Alzheimer's Disease Prediction</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">            
            <li className="nav-item">
              <a href="https://www.alz.org/alzheimers-dementia/what-is-alzheimers" className="nav-link" target="_blank" rel="noopener noreferrer">About Alzheimer's</a>
            </li>
            <li className="nav-item">
              <Link to="/predict" className="nav-link">Predict</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="mb-4">Early Alzheimer's Disease Prediction</h1>
            {/* Other content */}
            <Link to="/predict" className="btn btn-primary">Click here to Predict</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
