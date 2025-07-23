import React from 'react';
import './AuditLogPage.css';

const logData = [
  { id: 1, timestamp: '2024-07-25 10:30:15', user: 'john.doe@drishti.com', action: 'Triggered Oracle Simulation: "Open Gate C"', status: 'Completed' },
  { id: 2, timestamp: '2024-07-25 10:29:50', user: 'System', action: 'Predictive Alert: High-density bottleneck at Gate C', status: 'Critical' },
  { id: 3, timestamp: '2024-07-25 10:28:00', user: 'jane.smith@drishti.com', action: 'Changed alert threshold for Device Density to 8.0', status: 'Success' },
  { id: 4, timestamp: '2024-07-25 09:15:22', user: 'jane.smith@drishti.com', action: 'User login', status: 'Success' },
];

const AuditLogPage = () => {
  return (
    <div className="audit-log-page">
      <div className="settings-header">
        <h1>Audit Log</h1>
        <p>Review system events, user actions, and alert history.</p>
      </div>

      <div className="log-table-container">
        <table className="log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logData.map(log => (
              <tr key={log.id}>
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td className="action-cell">{log.action}</td>
                <td>
                  <span className={`log-status ${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogPage; 