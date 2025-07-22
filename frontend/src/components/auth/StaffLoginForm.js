import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function StaffLoginForm() {
  const [staffId, setStaffId] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!staffId || !staffPassword) {
      setError('Please enter your Service ID and password.');
    } else {
      setError('');
      alert('Staff login successful! (Demo only)');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleLogin}>
      <div className="registration-form-title">Staff / Security Login</div>
      <input
        className="registration-input"
        type="text"
        value={staffId}
        onChange={e => setStaffId(e.target.value)}
        placeholder="Service ID or Username"
        required
      />
      <input
        className="registration-input"
        type="password"
        value={staffPassword}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign in</button>
      {error && <div className="error">{error}</div>}
      <div className="registration-bottom-link">
        Not staff? <Link to="/login">Back to main login</Link>
      </div>
    </form>
  );
}

export default StaffLoginForm; 