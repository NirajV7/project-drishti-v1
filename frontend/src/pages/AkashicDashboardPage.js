import React from 'react';
import './ProfessionalDashboard.css';

const AkashicDashboardPage = () => {
    return (
        <div className="akashic-dashboard">
            <div className="akashic-header">
                <h1>Project Akashic: The Event Genome</h1>
                <p>Turning real-time event data into high-value business intelligence.</p>
            </div>
            <div className="akashic-grid">
                <div className="akashic-panel large">
                    <div className="panel-header">Crowd Flow Heatmap (BIEC - Day 3)</div>
                    <img src="/heatmap.png" alt="Crowd flow heatmap" />
                </div>
                <div className="akashic-panel">
                    <div className="panel-header">Sentiment vs. Queue Times</div>
                    <img src="/chart1.png" alt="Sentiment vs Queue Times Chart" />
                </div>
                <div className="akashic-panel">
                    <div className="panel-header">Resource Dispatch Efficiency</div>
                    <img src="/chart2.png" alt="Resource Dispatch Chart" />
                </div>
            </div>
        </div>
    );
};

export default AkashicDashboardPage; 