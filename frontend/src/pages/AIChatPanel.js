import React from 'react';
import './AIChatPanel.css';

const AIChatPanel = ({ onClose }) => {
  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-panel" onClick={e => e.stopPropagation()}>
        <div className="ai-chat-header">
          <h3>Drishti AI Oracle</h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="ai-chat-messages">
          <div className="message ai">
            <p><strong>Predictive Alert:</strong> A high-density bottleneck is predicted at Gate C in 15 minutes. Confidence: 99%. Prediction based on visual, RF, and atmospheric data.</p>
          </div>
          <div className="message user">
            <p>What if I fully open Gate C now?</p>
          </div>
          <div className="message ai">
            <p><strong>Oracle Simulation Complete:</strong> Opening Gate C now will relieve the initial bottleneck, but the simulation shows this action creates a new high-risk crush point near the Main Stage. This action is not recommended.</p>
          </div>
        </div>
        <div className="ai-chat-input-area">
          <input type="text" placeholder="Ask a 'what if' question..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel; 