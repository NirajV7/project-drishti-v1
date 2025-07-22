import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function ProfessionalDashboard() {
  return (
    <div className="home-page">
      <h1>Welcome, Commander!</h1>
      <p>This is your professional dashboard.</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
}

export default ProfessionalDashboard; 