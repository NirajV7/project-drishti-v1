import React, { useState } from 'react';
import './ProfessionalDashboard.css';

const ArjunsAppPanel = ({ onClose, onReportSubmit, koshState }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (onReportSubmit) onReportSubmit();
    };

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