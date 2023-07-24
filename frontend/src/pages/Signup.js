import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [addProfile] = useMutation(ADD_PROFILE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProfile({
        variables: formData,
      });

      // Check if data and data.addProfile exist before destructuring
      if (data && data.addProfile) {
        const { token, profile } = data.addProfile;
        console.log('Token:', token);
        console.log('Profile ID:', profile._id);
        // You can also save the token to local storage or a state management system for user authentication.
      } else {
        console.error('Unexpected response from addProfile mutation:', data);
      }
    } catch (error) {
      console.error('Error creating profile:', error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
