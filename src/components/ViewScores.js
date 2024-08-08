import React, { useEffect, useState } from 'react';

const UserScores = () => {
  const [userScores, setUserScores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserScores = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/get-user-scores', {
          credentials: 'include', // Include credentials for session-based authentication
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch user scores: ${response.statusText}`);
        }
        const data = await response.json();
        setUserScores(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch user scores');
        console.error('Error fetching user scores:', error);
      }
    };

    fetchUserScores();
  }, []);

  const containerStyle = {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#fff',
    border: '1px solid #000', // Black border around the table
  };

  const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #000', // Black border at the bottom of the header
  };

  const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #000', // Black border at the bottom of each cell
    borderRight: '1px solid #000',  // Black border between columns
  };

  const tableRowStyle = {
    borderBottom: '1px solid #000', // Black border at the bottom of each row
  };

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>User Scores</h1>
      {error && <p style={errorStyle}>{error}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, borderRight: '2px solid #000' }}>Username</th>
            <th style={tableHeaderStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((userScore, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={{ ...tableCellStyle, borderRight: '1px solid #000' }}>{userScore.username}</td>
              <td style={tableCellStyle}>{userScore.totalScore === 'Not Attempted' ? 'Not Attempted' : userScore.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserScores;
