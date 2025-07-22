import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './Auth.css';

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email: user.email,
        role: 'attendee', // Default universal role
      });
      // Redirect handled by AuthProvider
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSignup}>
      <div className="registration-form-title">Create your Drishti Account</div>
      <input
        className="registration-input"
        type="text"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        placeholder="Full Name"
        required
      />
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
        placeholder="Create Password"
        required
      />
      <div className="terms-section">
        <label className="styled-checkbox">
          <input type="checkbox" required />
          <span>I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</span>
        </label>
      </div>
      <button type="submit">Create Account</button>
      {error && <div className="error">{error}</div>}
      <div className="registration-bottom-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </form>
  );
}

export default SignupForm; 