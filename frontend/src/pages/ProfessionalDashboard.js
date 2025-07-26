import React, { useState } from 'react';
import './ProfessionalDashboard.css';
import GhostProtocolPage from './GhostProtocolPage';
import CCTVPage from './CCTVPage';
import AIChatPanel from './AIChatPanel';
import MapViewPage from './MapViewPage';
import SettingsPage from './SettingsPage';
import UserManagementPage from './UserManagementPage';
import AuditLogPage from './AuditLogPage';

function ProfessionalDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <CCTVPage setActivePage={setActivePage} />;
      case 'ghost':
        return <GhostProtocolPage />;
      case 'map':
        return <MapViewPage />;
      case 'users':
        return <UserManagementPage />;
      case 'audit':
        return <AuditLogPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <CCTVPage />;
    }
  };

  return (
    <div className="pd-body">
      <div className="pd-container">
        <aside className="pd-sidebar">
            <div className="pd-logo">
                <img src="" alt="Drishti Logo" />
                <span>DRISHTI</span>
            </div>
            <nav className="pd-nav">
                <a href="#dashboard" className={`pd-nav-item${activePage === 'dashboard' ? ' active' : ''}`} onClick={() => setActivePage('dashboard')}>Dashboard</a>
                <a href="#ghost" className={`pd-nav-item${activePage === 'ghost' ? ' active' : ''}`} onClick={() => setActivePage('ghost')}>Ghost Protocol</a>
                <a href="#map" className={`pd-nav-item${activePage === 'map' ? ' active' : ''}`} onClick={() => setActivePage('map')}>Map View</a>
                <a href="#users" className={`pd-nav-item${activePage === 'users' ? ' active' : ''}`} onClick={() => setActivePage('users')}>User Management</a>
                <a href="#audit" className={`pd-nav-item${activePage === 'audit' ? ' active' : ''}`} onClick={() => setActivePage('audit')}>Audit Log</a>
                <a href="#settings" className={`pd-nav-item${activePage === 'settings' ? ' active' : ''}`} onClick={() => setActivePage('settings')}>Settings</a>
            </nav>
            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar">JD</div>
                    <div className="user-profile-info">
                        <span className="user-name">John Doe</span>
                        <span className="user-role">Administrator</span>
                    </div>
                </div>
            </div>
        </aside>

        <main className="pd-main-content">
          <div className="pd-header">
            <div>
              <h1>Visual Command Center</h1>
              <p>Real-time CCTV Monitoring</p>
            </div>
            <button className="ai-oracle-button" onClick={() => setIsChatOpen(true)}>
              Consult AI Oracle
            </button>
          </div>

          <div className="visual-layout">
            {renderContent()}
          </div>
        </main>
        {isChatOpen && <AIChatPanel context="General inquiry." onClose={() => setIsChatOpen(false)} setActivePage={setActivePage} />}
      </div>
    </div>
  );
}

export default ProfessionalDashboard; 