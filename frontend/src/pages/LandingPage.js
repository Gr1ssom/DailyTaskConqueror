import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to Daily Task Conqueror</h1>
      <p>Conquer your tasks, one day at a time.</p>
      <Link to="/login">
        <button>Take me to Login</button>
      </Link>
    </div>
  );
}

export default LandingPage;