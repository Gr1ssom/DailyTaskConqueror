import React from 'react';
import Auth from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate('/');
  };

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="checklist icon">✅</span>
          -TaskConqueror-
        </Link>
      </h1>

      <nav>
        {Auth.loggedIn() ? (
          <>
            <ul className="flex-row">
              <li className="mx-1">
                <Link to="/taskHistory">Task History</Link>
              </li>
              <li className="mx-1">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </>
        ) : (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Nav;
