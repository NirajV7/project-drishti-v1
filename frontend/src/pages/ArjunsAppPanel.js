import React, { useState } from 'react';
import './ProfessionalDashboard.css';

const ArjunsAppPanel = ({ onClose, onReportSubmit, koshState, akashicState }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showRewind, setShowRewind] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (onReportSubmit) onReportSubmit();
    };

    if (showRewind) {
        return (
            <div className="guardian-panel arjuns-app">
                <div className="panel-header">
                    <span>ARJUN'S APP VIEW (SIMULATED)</span>
                    <button onClick={onClose} className="panel-close-button">&times;</button>
                </div>
                <div className="app-screen">
                    <video src="/digital_rewind.mp4" autoPlay loop muted className="live-view-video" />
                </div>
            </div>
        );
    }

    if (akashicState === 'ready') {
        return (
            <div className="guardian-panel arjuns-app">
                <div className="panel-header">
                    <span>ARJUN'S APP VIEW (SIMULATED)</span>
                    <button onClick={onClose} className="panel-close-button">&times;</button>
                </div>
                <div className="app-screen">
                    <div className="app-alert app-rewind-ready" onClick={() => setShowRewind(true)}>
                        <div className="app-alert-title">Your Digital Rewind is ready!</div>
                        <p>Click to watch a personalized story of your event journey.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (koshState === 'dispatched' || koshState === 'complete') {
        return (
            <div className="guardian-panel arjuns-app">
                <div className="panel-header">
                    <span>ARJUN'S APP VIEW (SIMULATED)</span>
                    <button onClick={onClose} className="panel-close-button">&times;</button>
                </div>
                <div className="app-screen">
                    <div className="app-alert app-good-news">
                        <div className="app-alert-title">GOOD NEWS!</div>
                        <p>We have located your backpack. A staff member is retrieving it now. Please proceed to the Guest Services tent to identify and collect your item.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="guardian-panel arjuns-app">
                <div className="panel-header">
                    <span>ARJUN'S APP VIEW (SIMULATED)</span>
                    <button onClick={onClose} className="panel-close-button">&times;</button>
                </div>
                <div className="app-screen">
                    <div className="app-alert app-confirmation">
                        <div className="app-alert-title">REPORT RECEIVED</div>
                        <p>Thank you. We are running a secure, anonymous search for your backpack now. Please stand by for updates.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="guardian-panel arjuns-app">
            <div className="panel-header">
                <span>ARJUN'S APP VIEW (SIMULATED)</span>
                <button onClick={onClose} className="panel-close-button">&times;</button>
            </div>
            <div className="app-screen">
                <form className="lost-item-form" onSubmit={handleSubmit}>
                    <h3>Report a Lost Item</h3>
                    <div className="form-group">
                        <label>Item:</label>
                        <input type="text" defaultValue="Backpack" />
                    </div>
                    <div className="form-group">
                        <label>Last Seen Near:</label>
                        <input type="text" defaultValue="Main Stage" />
                    </div>
                    <div className="form-group">
                        <label>Approximate Time:</label>
                        <input type="text" defaultValue="10:00 PM" />
                    </div>
                    <button type="submit" className="app-button">Submit Report</button>
                </form>
            </div>
        </div>
    );
};

export default ArjunsAppPanel; 