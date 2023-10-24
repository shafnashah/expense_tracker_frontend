// App.js
import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('debit');

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = await response.json();
    console.log(data);
  };

  const createExpense = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, date, description, amount, transaction_type: transactionType }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={registerUser}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required /><br /><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br /><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><br /><br />
        <button type="submit">Register</button>
      </form>

      <h2>User Login</h2>
      <form onSubmit={loginUser}>
        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required /><br /><br />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required /><br /><br />
        <button type="submit">Login</button>
      </form>

      <h2>Create New Expense</h2>
      <form onSubmit={createExpense}>
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required /><br /><br />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br /><br />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required /><br /><br />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required /><br /><br />
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select><br /><br />
        <button type="submit">Create Expense</button>
      </form>
    </div>
  );
};

export default App;
