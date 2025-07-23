import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Layout.css';
import './AboutPage.css';

function AboutPage() {
    const navigate = useNavigate();

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
                <button className="navbar-cta" onClick={() => navigate('/')}>Join Event</button>
            </nav>

            {/* Page Content */}
            <div className="page-content about-page">
                <div className="about-hero">
                    <div className="about-hero-text">
                        <h1>Pioneering the Future of Event Management</h1>
                        <p>Project Drishti is a cutting-edge platform designed to revolutionize event experiences through real-time data, enhanced safety protocols, and seamless communication.</p>
                    </div>
                    <div className="about-hero-image">
                        <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=800&q=80" alt="Futuristic Tech" />
                    </div>
                </div>

                <div className="how-it-works-section">
                    <h2>How It Works</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Real-Time Analytics</h3>
                            <p>Gain live insights into event dynamics, attendee flow, and resource allocation.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3>Enhanced Safety</h3>
                            <p>Monitor crowd density and trigger automated alerts to ensure a secure environment.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💬</div>
                            <h3>Instant Communication</h3>
                            <p>Relay critical information to staff and attendees instantly through a unified channel.</p>
                        </div>
                    </div>
                </div>
                 <div className="team-section">
                    <h2>Meet the Innovators</h2>
                    <p>Powered by Team Vertex Vanguard 2.0</p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage; 