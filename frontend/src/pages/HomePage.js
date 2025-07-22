import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to your Drishti Home</h1>
      <p>Your universal dashboard for all events.</p>
      <div className="home-actions">
        <button className="cta-button">Add or Join an Event</button>
      </div>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
}

export default HomePage; 