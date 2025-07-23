import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Layout.css';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="page-container">
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="navbar-logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
          <img src="/drishti-logo.png" alt="Drishti Logo" className="logo-icon" />
          <span className="logo-text">Drishti</span>
        </div>
        <ul className="navbar-links">
          <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
        </ul>
        <button className="navbar-cta" onClick={handleSignOut}>Sign Out</button>
      </nav>

      {/* Hero Content */}
      <div className="page-content home-hero">
        <div className="home-hero-text">
          <h1>Welcome to your Drishti Home</h1>
          <h4>Your universal dashboard for all events.</h4>
          <div className="home-hero-buttons">
            <button className="cta-button primary">Add or Join an Event</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div className="home-hero-image">
           <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" alt="Futuristic Abstract" />
        </div>
      </div>
    </div>
  );
}

export default HomePage; 