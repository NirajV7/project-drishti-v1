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
  const [ghostProtocolScenarioId, setGhostProtocolScenarioId] = useState(1); // Default to 1
  const [simulationStatus, setSimulationStatus] = useState('active'); // 'active' or 'resolved'
  const [anomalySimulationState, setAnomalySimulationState] = useState('inactive'); // inactive, ambiguous-smoke, fire-confirmed, dispatch-route, echo-active, chimera-deployed
  const [showDispatchAlert, setShowDispatchAlert] = useState(false);

  const handleStartAnomalySimulation = () => {
    setActivePage('dashboard');
    setAnomalySimulationState('ambiguous-smoke');
    setShowDispatchAlert(false);
    
    // Automatically escalate the alert after a delay
    setTimeout(() => {
        setAnomalySimulationState('fire-confirmed');
        // Show dispatch alert shortly after fire confirmation
        setTimeout(() => {
            setShowDispatchAlert(true);
            setAnomalySimulationState('dispatch-route');
            setActivePage('map'); // Switch to map view
        }, 2000); // 2-second delay
    }, 4000); // 4-second delay for demonstration
  };

  const handleResolveSimulation = () => {
    setSimulationStatus('resolved'); // Turn map zones green
    setShowDispatchAlert(false);

    // After a delay, reset everything to the initial state
    setTimeout(() => {
        setAnomalySimulationState('inactive');
        setSimulationStatus('active'); // Reset for the next simulation
        setActivePage('dashboard');
    }, 3000); // 3-second delay
  };

  const handleActivateEcho = () => {
    setAnomalySimulationState('echo-active');
  };

  const handleDeployChimera = () => {
    setAnomalySimulationState('chimera-deployed');
    setActivePage('dashboard'); // Switch back to CCTV to see the drone feed
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <CCTVPage 
                  setActivePage={setActivePage} 
                  setGhostProtocolScenarioId={setGhostProtocolScenarioId}
                  anomalySimulationState={anomalySimulationState}
               />;
      case 'ghost':
        return <GhostProtocolPage ghostProtocolScenarioId={ghostProtocolScenarioId} setGhostProtocolScenarioId={setGhostProtocolScenarioId} />;
      case 'map':
        return <MapViewPage simulationStatus={simulationStatus} anomalySimulationState={anomalySimulationState} />;
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
          <header className="pd-header">
            <h1>Visual Command Center</h1>
            <p>Real-time CCTV Monitoring</p>
            <div>
              {anomalySimulationState === 'inactive' ? (
                <button className="consult-ai-button" onClick={handleStartAnomalySimulation}>
                  Simulate Anomaly
                </button>
              ) : (
                <button className="consult-ai-button" onClick={handleResolveSimulation}>
                  Resolve Simulation
                </button>
              )}

              {(anomalySimulationState === 'dispatch-route' || anomalySimulationState === 'echo-active') && (
                <>
                  <button 
                    className="consult-ai-button" 
                    onClick={handleActivateEcho} 
                    disabled={anomalySimulationState !== 'dispatch-route'}
                  >
                    Activate Project Echo
                  </button>
                  <button className="consult-ai-button" onClick={handleDeployChimera}>Deploy Project Chimera</button>
                </>
              )}
              
              <button className="consult-ai-button" onClick={() => setIsChatOpen(true)}>
                <i className="fas fa-brain"></i> Consult AI Oracle
              </button>
            </div>
          </header>

          <div className="visual-layout">
            {renderContent()}
            {showDispatchAlert && (
                <div className="dispatch-alert">
                    <span>
                        AUTOMATED DISPATCH: Agent built with Vertex AI Agent Builder has dispatched nearest security unit (S-14). Route displayed on map.
                    </span>
                    <button className="close-alert-button" onClick={() => setShowDispatchAlert(false)}>&times;</button>
                </div>
            )}
          </div>
        </main>
        {isChatOpen && 
            <AIChatPanel 
                context="General inquiry." 
                onClose={() => setIsChatOpen(false)} 
                setActivePage={setActivePage}
                setGhostProtocolScenarioId={setGhostProtocolScenarioId}
            />}
      </div>
    </div>
  );
}

export default ProfessionalDashboard; 