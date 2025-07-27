import React from 'react';
import './AlertModal.css';

function AlertModal({ title, message, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>Acknowledge</button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal; 