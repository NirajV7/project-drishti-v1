import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Auth.css';

function LoginForm() {
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
      if (role === 'commander' || role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleLogin}>
      <div className="registration-form-title">Sign in to your Account</div>
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
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      <div className="registration-bottom-link">
        Are you event staff? <Link to="/staff-login">Staff Login</Link>
      </div>
    </form>
  );
}

export default LoginForm; 