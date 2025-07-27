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
import PriyasAppPanel from './PriyasAppPanel'; // Import the new panel
import SoundscapePanel from './SoundscapePanel'; // Import the new panel
import BiometricPanel from './BiometricPanel'; // Import the new panel
import GuardianAppPanel from './GuardianAppPanel'; // Import the new panel
import DroneAnimation from './DroneAnimation'; // Import the new component
import ArjunsAppPanel from './ArjunsAppPanel'; // Import the new component

function ProfessionalDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [ghostProtocolScenarioId, setGhostProtocolScenarioId] = useState(1); // Default to 1
  const [simulationStatus, setSimulationStatus] = useState('active'); // 'active' or 'resolved'
  const [anomalySimulationState, setAnomalySimulationState] = useState('inactive'); // inactive, ambiguous-smoke, fire-confirmed, dispatch-route, echo-active, chimera-deployed, summary-open
  const [showDispatchAlert, setShowDispatchAlert] = useState(false);
  const [summaryContext, setSummaryContext] = useState('');

  // States for the new Guardian Network Simulation
  const [guardianSimulationState, setGuardianSimulationState] = useState('inactive'); // inactive, lost-child, sonic-shield, guiding-mother, distress-follower, guardian-active, drone-active
  const [showPriyasApp, setShowPriyasApp] = useState(false);
  const [showSoundscape, setShowSoundscape] = useState(false);
  const [isDistress, setIsDistress] = useState(false); // New state for distress variation
  const [showBiometrics, setShowBiometrics] = useState(false);
  const [showGuardianApp, setShowGuardianApp] = useState(false);
  const [isKiliDroneActive, setIsKiliDroneActive] = useState(false);
  const [showDroneAnimation, setShowDroneAnimation] = useState(false);

  // States for Project Kosh
  const [koshState, setKoshState] = useState('inactive'); // inactive, reporting, searching, located, dispatched, complete
  const [showArjunsApp, setShowArjunsApp] = useState(false);
  const [koshAlert, setKoshAlert] = useState(null);

  const handleStartKoshSimulation = () => {
    setKoshState('reporting');
    setShowArjunsApp(true);
  };

  const handleKoshReportSubmit = () => {
    setKoshState('searching');
    setShowArjunsApp(false); // Close the app view to see the map
    setActivePage('map');
    setKoshAlert("PROJECT KOSH: Lost backpack reported. Retrieving anonymous vector path for Attendee #C7D2 between 9:45 PM and 10:15 PM.");

    // Simulate the search and discovery
    setTimeout(() => {
        setKoshState('located');
        setKoshAlert("ITEM LOCATED: Object matching 'backpack' signature identified at moment of separation. Location: G-45 (West Sound Tower).");
        
        // Automate the recovery process
        setTimeout(() => {
            setKoshState('dispatched');
            setKoshAlert("STAFF DISPATCHED: Nearest event staff member (Staff ID: E-38) has been dispatched to retrieve the item.");
            setShowArjunsApp(true); // Re-open Arjun's app with the new notification

            // Final confirmation
            setTimeout(() => {
                setKoshState('complete');
                setKoshAlert("RECOVERY COMPLETE: Item retrieved by E-38. Awaiting owner at Guest Services.");
            }, 4000); // 4-second staff travel time
        }, 2000); // 2-second delay before dispatch
    }, 5000); // 5-second search
  };

  const handleStartGuardianSimulation = () => {
    setGuardianSimulationState('lost-child');
    setShowPriyasApp(true);
    // No longer redirecting to the dashboard, so the admin stays on the simulations page
  };

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

  const handleActivateGuardianNetwork = () => {
    setShowGuardianApp(true);
    setGuardianSimulationState('guardian-active');
  };

  const handleDeployKiliDrone = () => {
    setShowDroneAnimation(true); // Start the animation
  };

  const handleDroneAnimationEnd = () => {
    setShowDroneAnimation(false); // Hide animation
    setIsKiliDroneActive(true); // Show drone feed
    setGuardianSimulationState('drone-active');
  };

  const handleSimulateDistressAndFollower = () => {
    setShowBiometrics(true);
    setGuardianSimulationState('distress-follower');
  };

  const handleTaskSonicShield = (distress) => {
    setShowSoundscape(true);
    setIsDistress(distress);
    setGuardianSimulationState('sonic-shield');
  };

  const handleGuidePriya = () => {
    setGuardianSimulationState('guiding-mother');
    // The video playback is handled within PriyasAppPanel now
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <CCTVPage 
                  setActivePage={setActivePage} 
                  setGhostProtocolScenarioId={setGhostProtocolScenarioId}
                  anomalySimulationState={anomalySimulationState}
                  isKiliDroneActive={isKiliDroneActive}
               />;
      case 'ghost':
        return <GhostProtocolPage ghostProtocolScenarioId={ghostProtocolScenarioId} setGhostProtocolScenarioId={setGhostProtocolScenarioId} />;
      case 'map':
        return <MapViewPage simulationStatus={simulationStatus} anomalySimulationState={anomalySimulationState} koshState={koshState} />;
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
                    handleStartGuardianSimulation={handleStartGuardianSimulation}
                    handleTaskSonicShield={handleTaskSonicShield} // Pass the new handler
                    handleSimulateDistressAndFollower={handleSimulateDistressAndFollower} // Pass the new handler
                    handleActivateGuardianNetwork={handleActivateGuardianNetwork} // Pass the new handler
                    handleDeployKiliDrone={handleDeployKiliDrone} // Pass the new handler
                    handleStartKoshSimulation={handleStartKoshSimulation} // Pass the new handler
                />;
      default:
        return <CCTVPage setActivePage={setActivePage} setGhostProtocolScenarioId={setGhostProtocolScenarioId} anomalySimulationState={anomalySimulationState} isKiliDroneActive={isKiliDroneActive} />;
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
          
          {koshAlert && (
              <div className="dispatch-alert kosh-alert">
                  <span>{koshAlert}</span>
                  <button className="close-alert-button" onClick={() => setKoshAlert(null)}>&times;</button>
              </div>
          )}

          {/* Floating Panels Area */}
          <div className="floating-panels-area">
            {showPriyasApp && <PriyasAppPanel onGuideMeClick={handleGuidePriya} onClose={() => setShowPriyasApp(false)} />}
            {showGuardianApp && <GuardianAppPanel onClose={() => setShowGuardianApp(false)} />}
            {showSoundscape && <SoundscapePanel isDistress={isDistress} onClose={() => setShowSoundscape(false)} />}
            {showBiometrics && <BiometricPanel onClose={() => setShowBiometrics(false)} />}
            {showArjunsApp && <ArjunsAppPanel onReportSubmit={handleKoshReportSubmit} onClose={() => setShowArjunsApp(false)} koshState={koshState} />}
          </div>
        </main>
        
        {showDroneAnimation && <DroneAnimation onAnimationEnd={handleDroneAnimationEnd} />}
        
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