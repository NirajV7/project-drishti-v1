import React, { useState } from 'react';
import './Dashboard.css';
// MapComponent import removed

function Dashboard() {
  // State to manage the surge simulation data
  const [surgeData, setSurgeData] = useState({ level: 0, showAlert: false });

  const handleSimulateSurge = () => {
    setSurgeData({ level: 0, showAlert: false });
    const SURGE_STEPS = 50;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / SURGE_STEPS;
      setSurgeData(prev => ({ ...prev, level: progress }));
      if (currentStep >= SURGE_STEPS) {
        clearInterval(interval);
        setTimeout(() => {
          setSurgeData(prev => ({ ...prev, showAlert: true }));
        }, 1000);
      }
    }, 100);
  };

  const handleReset = () => {
    setSurgeData({ level: 0, showAlert: false });
  };

  return (
    <div className="app-container">
      <h1>Project Drishti V1</h1>
      <div className="main-container">
        <div className="dashboard-content">
          {/* MapComponent removed, placeholder below */}
          <div className="view-placeholder">
            Main View (Map/Ghost Protocol)
          </div>
        </div>
        <div id="side-panel">
          <h2>Live Stats</h2>
          {/* Stats content here */}
        </div>
      </div>
      <div className="controls">
        <button>Switch View</button>
        <hr />
        <button onClick={handleSimulateSurge}>Simulate Crowd Surge</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Dashboard; 