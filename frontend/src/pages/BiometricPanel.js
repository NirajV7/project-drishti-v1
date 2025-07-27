import React from 'react';
import './ProfessionalDashboard.css';

const BiometricPanel = ({ onClose }) => {
    return (
        <div className="guardian-panel biometric-panel">
            <div className="panel-header">
                <span>PRIYA'S BIOMETRIC STATUS</span>
                <button onClick={onClose} className="panel-close-button">&times;</button>
            </div>
            <div className="biometric-content">
                <div className="heart-rate">
                    <div className="heart-rate-label">HEART RATE</div>
                    <div className="heart-rate-value">132 <span>BPM</span></div>
                    <div className="heart-rate-graph">
                        <img src="/heart_rate_spike.png" alt="Heart rate graph" />
                    </div>
                </div>
                <div className="biometric-alert">
                    EMPATHIC SHIELD ALERT: Implicit distress detected! User's biometric data indicates fear response.
                </div>
            </div>
        </div>
    );
};

export default BiometricPanel; 