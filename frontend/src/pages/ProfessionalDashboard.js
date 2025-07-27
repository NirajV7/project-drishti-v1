import React, { useState } from 'react';
import './ProfessionalDashboard.css';
import GhostProtocolPage from './GhostProtocolPage';
import CCTVPage from './CCTVPage';
import AIChatPanel from './AIChatPanel';
import MapViewPage from './MapViewPage';
import SettingsPage from './SettingsPage';
import UserManagementPage from './UserManagementPage';
import AuditLogPage from './AuditLogPage';
import SimulationsPage from './SimulationsPage';

function ProfessionalDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [ghostProtocolScenarioId, setGhostProtocolScenarioId] = useState(1); // Default to 1
  const [simulationStatus, setSimulationStatus] = useState('active'); // 'active' or 'resolved'
  const [anomalySimulationState, setAnomalySimulationState] = useState('inactive'); // inactive, ambiguous-smoke, fire-confirmed, dispatch-route, echo-active, chimera-deployed, summary-open
  const [showDispatchAlert, setShowDispatchAlert] = useState(false);
  const [summaryContext, setSummaryContext] = useState('');

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
    setSummaryContext(
        "EVENT SUMMARY:\n- Visual anomaly (smoke) detected in Service Area.\n" +
        "- Threat confirmed by atmospheric sensors (O2 drop, CO spike).\n" +
        "- Autonomous dispatch of Unit S-14 initiated.\n" +
        "- Project Echo activated to clear path.\n" +
        "- Project Chimera deployed for on-scene visual confirmation.\n" +
        "SITUATION UNDER CONTROL. Ready for your command."
    );
    setIsChatOpen(true);
    setAnomalySimulationState('summary-open');
    setShowDispatchAlert(false);
  };

  const handleActivateEcho = () => {
    setAnomalySimulationState('echo-active');
  };

  const handleDeployChimera = () => {
    setAnomalySimulationState('chimera-deployed');
    setActivePage('dashboard'); // Switch back to CCTV to see the drone feed

    // After a short delay, open the AI summary
    setTimeout(() => {
        setSummaryContext(
            "EVENT SUMMARY:\n- Visual anomaly (smoke) detected in Service Area.\n" +
            "- Threat confirmed by atmospheric sensors (O2 drop, CO spike).\n" +
            "- Autonomous dispatch of Unit S-14 initiated.\n" +
            "- Project Echo activated to clear path.\n" +
            "- Project Chimera deployed for on-scene visual confirmation.\n" +
            "SITUATION UNDER CONTROL. Ready for your command."
        );
        setIsChatOpen(true);
        setAnomalySimulationState('summary-open');
    }, 2000); // 2-second delay
  };

  const handleCloseSummaryAndReset = () => {
    setIsChatOpen(false);
    setSummaryContext('');
    // Truly reset the simulation state
    setAnomalySimulationState('inactive');
    setSimulationStatus('active');
    setActivePage('dashboard');
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
      case 'simulations':
        return <SimulationsPage 
                    handleStartAnomalySimulation={handleStartAnomalySimulation}
                    handleResolveSimulation={handleResolveSimulation}
                    anomalySimulationState={anomalySimulationState}
                    handleCrowdIncrease={() => { /* Placeholder for crowd sim */ }}
                />;
      default:
        return <CCTVPage setActivePage={setActivePage} setGhostProtocolScenarioId={setGhostProtocolScenarioId} anomalySimulationState={anomalySimulationState} />;
    }
  };

  return (
    <div className="pd-body">
      <div className="pd-container">
        <aside className="pd-sidebar">
            <div className="pd-branding">
                
                <h2 className="pd-title">Drishti V1</h2>
            </div>
            <nav className="pd-nav">
                <a href="#dashboard" className={`pd-nav-item${activePage === 'dashboard' ? ' active' : ''}`} onClick={() => setActivePage('dashboard')}>Dashboard</a>
                <a href="#ghost" className={`pd-nav-item${activePage === 'ghost' ? ' active' : ''}`} onClick={() => setActivePage('ghost')}>Ghost Protocol</a>
                <a href="#map" className={`pd-nav-item${activePage === 'map' ? ' active' : ''}`} onClick={() => setActivePage('map')}>Map View</a>
                <a href="#users" className={`pd-nav-item${activePage === 'users' ? ' active' : ''}`} onClick={() => setActivePage('users')}>User Management</a>
                <a href="#audit" className={`pd-nav-item${activePage === 'audit' ? ' active' : ''}`} onClick={() => setActivePage('audit')}>Audit Log</a>
                <a href="#simulations" className={`pd-nav-item${activePage === 'simulations' ? ' active' : ''}`} onClick={() => setActivePage('simulations')}>Simulations</a>
                <a href="#settings" className={`pd-nav-item${activePage === 'settings' ? ' active' : ''}`} onClick={() => setActivePage('settings')}>Settings</a>
            </nav>
            <div className="sidebar-footer">
                <p>Version 2.1.0</p>
                <p>&copy; 2024 Drishti Systems</p>
            </div>
        </aside>

        <main className="pd-main-content">
          <header className="pd-header">
            <h1>Visual Command Center</h1>
            <p>Real-time CCTV Monitoring</p>
            <div>
              {anomalySimulationState !== 'inactive' && anomalySimulationState !== 'summary-open' ? (
                <button className="consult-ai-button resolve-button" onClick={handleResolveSimulation}>
                  End Simulation & Get Summary
                </button>
              ) : null}

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

          {showDispatchAlert && (
            <div className="dispatch-alert">
              <span>AUTOMATED DISPATCH: Agent built with Vertex AI Agent Builder has dispatched nearest security unit (S-14). Route displayed on map.</span>
              <button className="close-alert-button" onClick={() => setShowDispatchAlert(false)}>&times;</button>
            </div>
          )}

          <div className="visual-layout">
            {renderContent()}
          </div>
        </main>
        {isChatOpen && 
            <AIChatPanel 
                context={summaryContext || "General inquiry."} 
                onClose={anomalySimulationState === 'summary-open' ? handleCloseSummaryAndReset : () => setIsChatOpen(false)} 
                setActivePage={setActivePage}
                setGhostProtocolScenarioId={setGhostProtocolScenarioId}
            />}
      </div>
    </div>
  );
}

export default ProfessionalDashboard; 