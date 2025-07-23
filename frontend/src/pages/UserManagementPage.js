import React from 'react';
import './UserManagementPage.css';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@drishti.com', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@drishti.com', role: 'Operator', status: 'Active' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@drishti.com', role: 'Operator', status: 'Inactive' },
  { id: 4, name: 'Mary Garcia', email: 'mary.garcia@drishti.com', role: 'Viewer', status: 'Active' },
];

const UserManagementPage = () => {
  return (
    <div className="user-management-page">
      <div className="settings-header">
        <h1>User Management</h1>
        <p>Add, edit, and manage user roles and permissions.</p>
      </div>

      <div className="actions-bar">
        <button className="add-user-btn">Add New User</button>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-pill ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage; 