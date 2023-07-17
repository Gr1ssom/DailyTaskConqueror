import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
