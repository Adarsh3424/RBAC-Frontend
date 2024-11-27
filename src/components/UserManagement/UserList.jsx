import React, { useEffect, useState } from "react";
import { getUsers, addUser, editUser, deleteUser } from "../../api/mockApi";
import "./UserList.css"; // Add CSS for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Fetch users from mock API
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddUser = () => {
    setCurrentUser({ name: "", roles: [], status: "Active" });
    setModalOpen(true);
  };

  const handleEditUser = (id) => {
    const user = users.find((u) => u.id === id);
    setCurrentUser({ ...user });
    setModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setNotification("User deleted successfully");
      getUsers().then(setUsers);
    }).catch((error) => {
      setNotification("Error deleting user");
      console.error(error);
    });
  };

  const handleSaveUser = () => {
    if (currentUser.name.trim() === "") {
      setNotification("User name cannot be empty!");
      return;
    }
    if (!currentUser.roles || currentUser.roles.length === 0) {
      setNotification("Roles cannot be empty!");
      return;
    }

    if (currentUser.id) {
      editUser(currentUser.id, currentUser).then(() => {
        setNotification("User updated successfully");
        getUsers().then(setUsers);
        setModalOpen(false);
      }).catch((error) => {
        setNotification("Error updating user");
        console.error(error);
      });
    } else {
      addUser(currentUser).then(() => {
        setNotification("User added successfully");
        getUsers().then(setUsers);
        setModalOpen(false);
      }).catch((error) => {
        setNotification("Error adding user");
        console.error(error);
      });
    }
  };

  const closeNotification = () => setNotification("");

  return (
    <div className="user-management">
      <button className="add-user-btn" onClick={handleAddUser}>
        Add User
      </button>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div>
              <strong>{user.name}</strong> - Roles:{" "}
              {Array.isArray(user.roles) ? user.roles.join(", ") : "No roles assigned"} - Status:{" "}
              {user.status}
            </div>
            <div className="user-actions">
              <button className="edit-btn" onClick={() => handleEditUser(user.id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentUser.id ? "Edit User" : "Add User"}</h3>
            <label>
              User Name:
              <input
                type="text"
                placeholder="Enter user name"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </label>
            <label>
  Roles:
  <select
    value={currentUser.roles[0] || ""} // Ensure a default value to prevent empty dropdown
    onChange={(e) =>
      setCurrentUser({ ...currentUser, roles: [e.target.value] }) // Update the roles array with the selected role
    }
  >
    <option value="" disabled>
      Select a role
    </option>
    <option value="Admin">Admin</option>
    <option value="User">User</option>
    <option value="Reader">Reader</option>
    <option value="Writer">Writer</option>
    <option value="Editor">Editor</option>
  </select>
</label>

            <label>
              Status:
              <select
                value={currentUser.status}
                onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveUser}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="toast-notification" onClick={closeNotification}>
          {notification}
        </div>
      )}
    </div>
  );
};

export default UserList;
