import React, { useState, useEffect } from 'react';
import './UserManagementPage.css';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const usersCollection = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
      setLoading(false);
    }, (err) => {
      setError('Failed to fetch users. Please try again later.');
      setLoading(false);
      console.error(err);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        // No need to update state here, onSnapshot will do it
      } catch (err) {
        console.error("Error deleting user: ", err);
        setError('Failed to delete user.');
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const userRef = doc(db, 'users', updatedUser.id);
      await updateDoc(userRef, {
        role: updatedUser.role,
        status: updatedUser.status
      });
      // No need to update state here, onSnapshot will do it
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error updating user: ", err);
      setError("Failed to update user.");
    }
  };

  if (loading) {
    return <div className="user-management-page"><h2>Loading users...</h2></div>;
  }

  if (error) {
    return <div className="user-management-page"><h2>{error}</h2></div>;
  }

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
                    <span className="user-name">{user.displayName || user.email}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </td>
                <td>{user.role || 'N/A'}</td>
                <td>
                  <span className={`status-pill ${user.status ? user.status.toLowerCase() : 'active'}`}>
                    {user.status || 'Active'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [role, setRole] = useState(user.role || 'N/A');
  const [status, setStatus] = useState(user.status || 'Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...user, role, status });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit User: {user.displayName || user.email}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="action-btn">Save Changes</button>
            <button type="button" className="action-btn delete" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagementPage; 