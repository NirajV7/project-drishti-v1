import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Layout.css';
import './ContactPage.css';

function ContactPage() {
  const navigate = useNavigate();
  const [employeeType, setEmployeeType] = useState('solo');

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

      <div className="page-content">
        {/* Left Panel: Form */}
        <div className="contact-form-panel">
          <div className="contact-form-header">
            <h1>Chat to our team</h1>
            <p>Need help with something? Want a demo? Get in touch with our friendly team and we'll get in touch within 2 hours.</p>
          </div>
          <form className="contact-form-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">First name</label>
                <input type="text" id="first-name" required />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last name</label>
                <input type="text" id="last-name" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="job-title">Job title</label>
              <input type="text" id="job-title" required />
            </div>
            <div className="form-group">
              <label htmlFor="work-email">Work email</label>
              <input type="email" id="work-email" required />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <div className="phone-input-wrapper">
                    <select className="country-code-select">
                        <option>US</option>
                    </select>
                    <input type="tel" id="phone" placeholder="+1 (555) 000-0000" required />
                </div>
            </div>

            <div className="form-group">
              <label>Number of employees</label>
              <div className="employee-type-options">
                <div 
                  className={`employee-option ${employeeType === 'solo' ? 'selected' : ''}`} 
                  onClick={() => setEmployeeType('solo')}>
                  <div className="icon">👤</div>
                  <div>
                    <span className="title">I'm a solo creator</span>
                    <span className="description">I need to set up an account for myself.</span>
                  </div>
                </div>
                <div 
                  className={`employee-option ${employeeType === 'team' ? 'selected' : ''}`}
                  onClick={() => setEmployeeType('team')}>
                   <div className="icon">👥</div>
                  <div>
                    <span className="title">I'm part of a team</span>
                    <span className="description">I need to set up an account for a team.</span>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="submit-button">Get in touch</button>
          </form>
        </div>

        {/* Right Panel: Image & Testimonial */}
        <div className="contact-image-panel">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team working" className="contact-panel-image" />
          <div className="testimonial-overlay">
             <div className="testimonial-logo">
                <img src="/drishti-logo.png" alt="Drishti Logo" />
                <span>Drishti</span>
             </div>
            <p className="testimonial-text">"Drishti helps us manage event logistics, safety, and communication with ease. It's a great solution for teams looking for an efficient way to manage their events all-in-one."</p>
            <div className="testimonial-author-section">
                <div className="testimonial-author">
                    <div>
                        <div className="author-name">Niraj V</div>
                        <div className="author-role">Founder, Vertex Vanguard 2.0</div>
                    </div>
                </div>
                 <div className="testimonial-author">
                    <div>
                        <div className="author-name">Nethul</div>
                        <div className="author-role">CEO, Vertex Vanguard 2.0</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 