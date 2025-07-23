import React from 'react';
import './ProfessionalDashboard.css';

function ProfessionalDashboard() {
  return (
    <div className="pd-body">
        <div className="pd-container">
            <aside className="pd-sidebar">
                <div className="pd-logo">
                    <img src="/drishti-logo.png" alt="Drishti Logo" />
                    <span>DRISHTI</span>
                </div>
                <nav className="pd-nav">
                    <a href="#dashboard" className="pd-nav-item active">
                        <span className="pd-icon">📊</span>
                        Dashboard
                    </a>
                    <a href="#events" className="pd-nav-item">
                        <span className="pd-icon">📅</span>
                        Events
                    </a>
                    <a href="#staff" className="pd-nav-item">
                        <span className="pd-icon">👥</span>
                        Staff
                    </a>
                    <a href="#analytics" className="pd-nav-item">
                        <span className="pd-icon">📈</span>
                        Analytics
                    </a>
                     <a href="#settings" className="pd-nav-item">
                        <span className="pd-icon">⚙️</span>
                        Settings
                    </a>
                </nav>
            </aside>
            <main className="pd-main-content">
                <header className="pd-header">
                    <h1>Welcome, Commander!</h1>
                    <p>Mission control for all event operations.</p>
                </header>
                <div className="pd-widgets-grid">
                    <div className="pd-widget">
                        <div className="widget-header">
                            <h3>Active Staff</h3>
                            <span className="widget-icon">📡</span>
                        </div>
                        <div className="widget-value">42</div>
                        <div className="widget-trend">+5 since last hour</div>
                    </div>
                     <div className="pd-widget">
                        <div className="widget-header">
                            <h3>Attendee Count</h3>
                            <span className="widget-icon">🚶‍♂️</span>
                        </div>
                        <div className="widget-value">1,283</div>
                        <div className="widget-trend">Peak time</div>
                    </div>
                     <div className="pd-widget">
                        <div className="widget-header">
                            <h3>System Alerts</h3>
                            <span className="widget-icon">⚠️</span>
                        </div>
                        <div className="widget-value">3</div>
                        <div className="widget-trend">High priority</div>
                    </div>
                </div>
                <div className="pd-main-panel">
                    <h3>Live Event Feed</h3>
                    <div className="feed-placeholder">
                        <p>Real-time data visualization will be displayed here.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}

export default ProfessionalDashboard; 