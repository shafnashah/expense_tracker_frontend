import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', { email, password })
      .then(response => {
        toast.success(response.data);
        // Further actions after successful login
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          console.error('Error occurred: ', error.message);
        }
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
