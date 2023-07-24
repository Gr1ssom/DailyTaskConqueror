import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_PROFILE } from '../utils/mutations';

function Signup() {
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({ email: '', password: '', name: '' });
  const [addProfile, { error: serverError }] = useMutation(ADD_PROFILE);
  const [feedback, setFeedback] = useState('');

  const { email, password, name } = formState;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password || !name) {
      setFeedback('Please fill out all fields.');
      return;
    }

    try {
      const { data } = await addProfile({ variables: formState });
      Auth.login(data.addProfile.token);
      navigate('/home');
    } catch (err) {
      console.error("Error signing up:", err);
      setFeedback('Error during signup. Please try again.');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="container my-1">
      <Link to="/login">← Go to Login</Link>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <section className="flex-row space-between my-2">
          <label htmlFor="firstName">Name:</label>
          <input
            placeholder="Your Name"
            name="name"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </section>
        <section className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </section>
        <section className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </section>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      {feedback && <p className="error-feedback">{feedback}</p>}
      {serverError && <p className="server-error">Error from server: {serverError.message}</p>}
    </main>
  );
}

export default Signup;
