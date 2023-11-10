import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const ExpensePage = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('credit');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editTransactionType, setEditTransactionType] = useState('credit');
  const calculateTotals = () => {
    let totalCredit = 0;
    let totalDebit = 0;

    expenses.forEach((expense) => {
      if (expense.transaction_type === 'credit') {
        totalCredit += parseFloat(expense.amount);
      } else {
        totalDebit += parseFloat(expense.amount);
      }
    });

    const balance = totalCredit - totalDebit;

    return { totalCredit, totalDebit, balance };
  };

  const { totalCredit, totalDebit, balance } = calculateTotals();
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };
  const handleAddExpense = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/expenses', {
        user_id: userId,
        date,
        description,
        amount,
        transaction_type: transactionType,
      })
      .then((response) => {
        toast.success(response.data);
        fetchExpenses();
        setDate('');
        setDescription('');
        setAmount('');
        setTransactionType('credit');
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          console.error('Error occurred: ', error.message);
        }
      });
  };

  const fetchExpenses = () => {
    axios
      .get(`http://localhost:3000/expenses/${userId}`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          console.error('Error occurred: ', error.message);
        }
      });
  };

  const handleDeleteExpense = (expenseId) => {
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
  
    if (confirmed) {
      axios
        .delete(`http://localhost:3000/expenses/${expenseId}`)
        .then((response) => {
          toast.success(response.data);
          fetchExpenses();
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data);
          } else {
            console.error('Error occurred: ', error.message);
          }
        });
    }
  };
  
  const handleEditExpense = (expenseId, updatedExpense) => {
    axios
      .put(`http://localhost:3000/expenses/${expenseId}`, updatedExpense)
      .then((response) => {
        toast.success(response.data);
        const updatedExpenses = expenses.map((expense) => {
          if (expense.expense_id === expenseId) {
            return {
              ...expense,
              date: editDate,
              description: editDescription,
              amount: editAmount,
              transaction_type: editTransactionType,
            };
          }
          return expense;
        });
  
        setExpenses(updatedExpenses);
        setEditingExpenseId(null);
        setEditDate('');
        setEditDescription('');
        setEditAmount('');
        setEditTransactionType('credit');
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          console.error('Error occurred: ', error.message);
        }
      });
  };
  const handleEdit = (expense) => {
    setEditingExpenseId(expense.expense_id);
    setEditDate(expense.date);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditTransactionType(expense.transaction_type);
  };
  const handleSave = (expenseId) => {
    const updatedExpense = {
      date: editDate,
      description: editDescription,
      amount: editAmount,
      transaction_type: editTransactionType,
    };
    const updatedExpenses = expenses.map((expense) => {
      if (expense.expense_id === expenseId) {
        return {
          ...expense,
          date: editDate,
          description: editDescription,
          amount: editAmount,
          transaction_type: editTransactionType,
        };
      }
      return expense;
    });
  
    setExpenses(updatedExpenses);
    setEditingExpenseId(null);
    setEditDate('');
    setEditDescription('');
    setEditAmount('');
    setEditTransactionType('credit');
  
    handleEditExpense(expenseId, updatedExpense);
  };
  useEffect(() => {
    fetchExpenses();
  }, [userId]);

 
  return (
    <div className="expense-page">
      <h2 style={{ textAlign: 'center' }}>Expense Tracker</h2>
      <form onSubmit={handleAddExpense}>
      </form>
      <div className="expense-table">
        <h3>Expense List</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.expense_id}>
                <td>
                  {editingExpenseId === expense.expense_id ? (
                   <input
                   type="date"
                   value={editDate}
                   onChange={(e) => setEditDate(e.target.value)}
                 />
               ) : (
                 formatDate(expense.date) // Format the date here
               )}
                </td>
                <td>
                  {editingExpenseId === expense.expense_id ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td>
                  {editingExpenseId === expense.expense_id ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  ) : (
                    expense.amount
                  )}
                </td>
                <td>
                  {editingExpenseId === expense.expense_id ? (
                    <select
                      value={editTransactionType}
                      onChange={(e) => setEditTransactionType(e.target.value)}
                    >
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  ) : (
                    expense.transaction_type
                  )}
                </td>
                <td>
                  {editingExpenseId === expense.expense_id ? (
                    <button onClick={() => handleSave(expense.expense_id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(expense)}>Edit</button>
                  )}
                  <button onClick={() => handleDeleteExpense(expense.expense_id)}>Delete</button>
                </td>
              </tr>
            ))}

            <tr>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </td>
              <td>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </td>
              <td>
                <button className="button" onClick={handleAddExpense}>Add Expense</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontWeight: 'bold' }}>Total Credit: {totalCredit}</p>
          <p style={{ fontWeight: 'bold' }}>Total Debit: {totalDebit}</p>
          <p style={{ fontWeight: 'bold', color: balance < 0 ? 'red' : 'black' }}>
        Balance: {balance}
          </p>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};


export default ExpensePage;