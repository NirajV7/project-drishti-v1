import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Correct path to AuthContext
import './Auth.css';

function StaffLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { role } = await login(email, password);
      if (role === 'admin' || role === 'commandor') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleLogin}>
      <div className="registration-form-title">Staff / Security Login</div>
      <input
        className="registration-input"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email Address"
        required
      />
      <input
        className="registration-input"
        type="password"
        value={password}
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