import React, { useState } from 'react';
import '../Registration.css';

function StaffLoginForm({ onBack }) {
  const [staffId, setStaffId] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    // Here you would check staffId/staffPassword against your backend
    if (!staffId || !staffPassword) {
      setError('Please enter your Service ID and password.');
    } else {
      // Simulate success
      setError('');
      alert('Staff login successful! (Demo only)');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleLogin}>
      <div className="registration-form-title">Staff / Security Login</div>
      <input
        type="text"
        value={staffId}
        onChange={e => setStaffId(e.target.value)}
        placeholder="Service ID or Username"
        required
      />
      <input
        type="password"
        value={staffPassword}
        onChange={e => setStaffPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign in</button>
      {error && <div className="error">{error}</div>}
      <div className="registration-bottom-link">
        Not staff? <a href="#" onClick={onBack}>Back to attendee signup</a>
      </div>
    </form>
  );
}

export default StaffLoginForm; 