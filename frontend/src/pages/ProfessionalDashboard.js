import React, { useState } from 'react';
import './ProfessionalDashboard.css';
import GhostProtocolPage from './GhostProtocolPage';
import CCTVPage from './CCTVPage';

function ProfessionalDashboard() {
  const [selectedPage, setSelectedPage] = useState('dashboard');

  return (
    <div className="pd-body">
      <div className="pd-container">
        <aside className="pd-sidebar">
            <div className="pd-logo">
                <img src="/drishti-logo.png" alt="Drishti Logo" />
                <span>DRISHTI</span>
            </div>
            <nav className="pd-nav">
                <a href="#dashboard" className={`pd-nav-item${selectedPage === 'dashboard' ? ' active' : ''}`} onClick={() => setSelectedPage('dashboard')}>Dashboard</a>
                <a href="#ghost" className={`pd-nav-item${selectedPage === 'ghost' ? ' active' : ''}`} onClick={() => setSelectedPage('ghost')}>Ghost Protocol</a>
                <a href="#staff" className="pd-nav-item">Staff</a>
                <a href="#analytics" className="pd-nav-item">Analytics</a>
                <a href="#settings" className="pd-nav-item">Settings</a>
            </nav>
        </aside>

        <main className="pd-main-content">
          <div className="pd-header">
              <h1>Visual Command Center</h1>
              <p>Real-time CCTV Monitoring</p>
          </div>

          <div className="visual-layout">
            {selectedPage === 'dashboard' ? <CCTVPage /> : <GhostProtocolPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfessionalDashboard; 