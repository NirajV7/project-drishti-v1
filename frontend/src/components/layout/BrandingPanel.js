import React from 'react';
import '../auth/Auth.css';

function BrandingPanel() {
  return (
    <div className="registration-left">
      <div className="registration-left-content">
        <img src="/logo192.png" alt="Event Logo" style={{ width: 48, height: 48, marginBottom: 24 }} />
        <div className="circle"></div>
        <h1>Powered by Project Drishti</h1>
        <p className="drishti-tagline">A world where a crowd of a million feels as safe as a room of one.</p>
      </div>
    </div>
  );
}

export default BrandingPanel; 