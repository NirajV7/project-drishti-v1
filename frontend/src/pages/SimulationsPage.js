import React from 'react';
import './ProfessionalDashboard.css';

// This component will act as a dedicated control panel for all simulations
const SimulationsPage = ({
    handleStartAnomalySimulation,
    handleResolveSimulation,
    anomalySimulationState,
    handleCrowdIncrease, // Assuming a function for the other simulation
}) => {
    return (
        <div className="simulations-control-panel">
            <div className="panel-header">ADMIN SIMULATION CONTROLS</div>
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