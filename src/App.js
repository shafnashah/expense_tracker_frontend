import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './Loginform';
import RegisterForm from './Registerform';
import ExpensePage from './expense';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false); 
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogin = (id) => {
    setUserId(id); 
    setAuthenticated(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              !authenticated ? (
                <LoginForm
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
              ) : (
                <Navigate to="/expenses" replace />
              )
            }
          />
          <Route
            path="/register"
            element={<RegisterForm onRegister={handleRegister} onLogin={handleLogin} />}
          />
          <Route
            path="/expenses"
            element={
              authenticated ? (
                <ExpensePage userId={userId} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
