import React from 'react';
import './ProfessionalDashboard.css';

const SoundscapePanel = ({ isDistress, onClose }) => {
    const statusText = isDistress ? "CHILD VOCAL DISTRESS SIGNATURE DETECTED!" : "Actively listening... No distress detected.";
    const panelClass = isDistress ? "soundscape-panel distress guardian-panel" : "soundscape-panel guardian-panel";

    return (
        <div className={panelClass}>
            <div className="panel-header">
                <span>LIVE SOUNDSCAPE ANALYSIS</span>
                <button onClick={onClose} className="panel-close-button">&times;</button>
            </div>
            <div className="soundscape-content">
                <div className="soundscape-waveform">
                    <img src={isDistress ? "/distress_waveform.png" : "/normal_waveform.png"} alt="Waveform" />
                </div>
                <div className="soundscape-status">
                    <p><strong>Status:</strong> {statusText}</p>
                </div>
            </div>
        </div>
    );
};

export default SoundscapePanel; 