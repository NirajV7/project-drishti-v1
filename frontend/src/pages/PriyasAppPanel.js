import React, { useState } from 'react';
import './ProfessionalDashboard.css';

const PriyasAppPanel = ({ onClose, onGuideMeClick }) => {
    const [isGuiding, setIsGuiding] = useState(false);

    const handleGuideClick = () => {
        setIsGuiding(true);
        if(onGuideMeClick) onGuideMeClick();
    };

    return (
        <div className="guardian-panel priyas-app">
            <div className="panel-header">
                <span>PRIYA'S APP VIEW (SIMULATED)</span>
                <button onClick={onClose} className="panel-close-button">&times;</button>
            </div>
            <div className="app-screen">
                {isGuiding ? (
                    <video src="/live_view_guidance.mp4" autoPlay loop muted className="live-view-video" />
                ) : (
                    <>
                        <div className="app-alert">
                            <div className="app-alert-title">PROJECT KILI ALERT</div>
                            <p>Rohan has wandered outside of your designated 'Family Zone'.</p>
                        </div>
                        <div className="app-status">
                            <p><strong>Last known location:</strong> Near Hall 3 Entrance</p>
                            <p><strong>Status:</strong> Locating...</p>
                        </div>
                        <button className="app-button" onClick={handleGuideClick}>
                            Guide Me with Live View
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PriyasAppPanel; 