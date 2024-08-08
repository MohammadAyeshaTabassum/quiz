import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Function to handle user addition
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('User added successfully!');
        setUsername('');
        setPassword('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user');
    }
  };

  // Function to handle view scores navigation
  const handleViewScores = () => {
    navigate('/view-scores'); // Redirect to view scores page
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <h1>Admin Page</h1>
      <p>Welcome, Admin!</p>

      <div className="card-container">
        <div className="card add-user-card">
          <h2>Add User</h2>
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">Add User</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="card view-scores-card">
          <h2>View Scores</h2>
          <button onClick={handleViewScores} className="view-scores-button">Go to View Scores</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
