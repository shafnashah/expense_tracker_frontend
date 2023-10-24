import React, { useState } from 'react';
import LoginForm from './Loginform';
import RegisterForm from './Registerform';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div className="center-content">
      {isRegistering ? (
        <RegisterForm onRegister={handleRegister} />
      ) : (
        <div>
          <LoginForm />
          <div className="link">
            <p>Don't have an account? <button className="link-button" onClick={handleRegisterClick}>Register</button></p>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default App;
