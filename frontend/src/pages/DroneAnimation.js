import React, { useEffect } from 'react';
import './ProfessionalDashboard.css';

const DroneAnimation = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, 4000); // The animation duration is 4s

        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="drone-animation-overlay">
            <div className="drone-icon-container">
                <img src="/drone_icon.png" alt="Drone" className="drone-icon" />
                <div className="drone-path"></div>
            </div>
            <div className="drone-status-text">
                DEPLOYING KILI COMPANION DRONE... ETA: 4s
            </div>
        </div>
    );
};

export default DroneAnimation; 