import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_PROFILE } from '../utils/mutations';

function Signup() {
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({ email: '', password: '', name: '' });
  const [addProfile, { error }] = useMutation(ADD_PROFILE);
  const [signupFeedback, setSignupFeedback] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!formState.email || !formState.password || !formState.name) {
      setSignupFeedback('Please fill out all fields.');
      return;
    }

    try {
      const mutationResponse = await addProfile({
        variables: formState,
      });

      const token = mutationResponse.data.addProfile.token;
      Auth.login(token);
      navigate('/home'); // Redirect to home after successful signup
    } catch (err) {
      console.error("Error signing up:", err);
      setSignupFeedback('Error during signup. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Name:</label>
          <input
            placeholder="name"
            name="name"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      {signupFeedback && <p>{signupFeedback}</p>}
      {error && <p>Error from server: {error.message}</p>}
    </div>
  );
}

export default Signup;
