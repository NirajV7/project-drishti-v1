import React from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure system parameters and preferences.</p>
      </div>

      <div className="settings-grid">
        {/* Alerts Section */}
        <div className="settings-card">
          <h3>Alert Thresholds</h3>
          <div className="setting-item">
            <label htmlFor="headcount">Visual Headcount Trigger</label>
            <input type="number" id="headcount" defaultValue="10000" />
          </div>
          <div className="setting-item">
            <label htmlFor="density">Device Density Trigger (per m²)</label>
            <input type="number" id="density" step="0.1" defaultValue="8.5" />
          </div>
          <div className="setting-item">
            <label htmlFor="oxygen">Oxygen Level Trigger (%)</label>
            <input type="number" id="oxygen" step="0.1" defaultValue="19.5" />
          </div>
        </div>

        {/* Map Display Section */}
        <div className="settings-card">
          <h3>Map Display</h3>
          <div className="setting-item">
            <label>Show Heatmap Overlay</label>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-item">
            <label>Show CCTV Camera Icons</label>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-card">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>Enable Audible Alerts</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-item">
            <label htmlFor="email">Send Critical Alerts to Email</label>
            <input type="email" id="email" placeholder="admin@drishti.com" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage; 