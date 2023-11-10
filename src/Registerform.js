import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const RegisterForm = ({ onRegister, onLogin}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', { username, email, password })
      .then(response => {
        toast.success('Registration successful. You can now login.');
       onRegister();
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
    <div className="center-content">
      <div className="form-container">
        <h2>REGISTER</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button className="button" type="submit">Register</button>
        </form>
        <div className="link">
        <p>Already have an account? <button className="link-button"  onClick={() => navigate('/login')}>Login</button></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;