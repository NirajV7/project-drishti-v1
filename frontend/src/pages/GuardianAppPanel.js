import React from 'react';
import './ProfessionalDashboard.css';

const GuardianAppPanel = ({ onClose }) => {
    return (
        <div className="guardian-panel guardian-app">
            <div className="panel-header">
                <span>GUARDIAN'S APP VIEW (SIMULATED)</span>
                <button onClick={onClose} className="panel-close-button">&times;</button>
            </div>
            <div className="app-screen">
                <div className="app-alert guardian-alert">
                    <div className="app-alert-title">GUARDIAN NETWORK ALERT</div>
                    <p>A community member may be in distress nearby. Please assist if you are able.</p>
                </div>
                <video src="/live_view_handoff_guardian.mp4" autoPlay loop muted className="live-view-video" />
            </div>
        </div>
    );
};

export default GuardianAppPanel; 