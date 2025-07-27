import React from 'react';
import './ProfessionalDashboard.css';

// This component will act as a dedicated control panel for all simulations
const SimulationsPage = ({
    handleStartAnomalySimulation,
    handleResolveSimulation,
    anomalySimulationState,
    handleCrowdIncrease,
    handleStartGuardianSimulation, // New handler for the Guardian Network
    handleTaskSonicShield, // New handler
    handleSimulateDistressAndFollower, // New handler
    handleActivateGuardianNetwork, // New handler
    handleDeployKiliDrone, // New handler
    handleStartKoshSimulation, // New handler for Project Kosh
}) => {
    return (
        <div className="simulations-control-panel">
            <div className="panel-header">ADMIN SIMULATION CONTROLS</div>
            <div className="simulation-group">
                <h3>Project Kosh (AI Lost & Found)</h3>
                <p>Demonstrates an AI-powered, privacy-preserving search and recovery for lost items.</p>
                <button 
                    className="admin-button" 
                    onClick={handleStartKoshSimulation}
                    disabled={anomalySimulationState !== 'inactive'}
                >
                    Start Lost Item Simulation
                </button>
            </div>
            <div className="simulation-group">
                <h3>The Guardian Network</h3>
                <p>Demonstrates proactive alerts and community-assisted response for a personal crisis.</p>
                <button 
                    className="admin-button" 
                    onClick={handleStartGuardianSimulation}
                    disabled={anomalySimulationState !== 'inactive'}
                >
                    Start Guardian Simulation
                </button>
                <div className="simulation-variation">
                    <h4>Step 2: Task Sonic Shield</h4>
                    <button className="admin-button" onClick={() => handleTaskSonicShield(false)}>Listen (No Distress)</button>
                    <button className="admin-button" onClick={() => handleTaskSonicShield(true)}>Listen (Distress Detected)</button>
                </div>
                <div className="simulation-variation">
                    <h4>Step 4: Simulate Hidden Threat</h4>
                    <button className="admin-button" onClick={handleSimulateDistressAndFollower}>Simulate Distress & Follower</button>
                </div>
                <div className="simulation-variation">
                    <h4>Step 5: Activate Community Response</h4>
                    <button className="admin-button" onClick={handleActivateGuardianNetwork}>Activate Guardian Network</button>
                </div>
                <div className="simulation-variation">
                    <h4>Step 6: Deploy Companion Drone</h4>
                    <button className="admin-button" onClick={handleDeployKiliDrone}>Deploy Kili Companion Drone</button>
                </div>
            </div>
            <div className="simulation-group">
                <h3>Multimodal Anomaly Scenario</h3>
                <p>Demonstrates autonomous threat verification and response.</p>
                {anomalySimulationState === 'inactive' ? (
                    <button className="admin-button" onClick={handleStartAnomalySimulation}>
                        Start Anomaly Simulation
                    </button>
                ) : (
                    <button className="admin-button" onClick={handleResolveSimulation}>
                        End & Reset Simulation
                    </button>
                )}
            </div>
            <div className="simulation-group">
                <h3>Crowd Density Scenario</h3>
                <p>Demonstrates predictive alerts for crowd bottlenecks.</p>
                <button 
                    className="admin-button" 
                    onClick={handleCrowdIncrease}
                    disabled={anomalySimulationState !== 'inactive'}
                >
                    Simulate Crowd Increase
                </button>
            </div>
        </div>
    );
};

export default SimulationsPage; 