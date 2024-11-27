import React, { useEffect, useState } from "react";
import { getRoles, addRole, editRole, deleteRole } from "../../api/mockApi";
import "./RoleList.css";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [notification, setNotification] = useState("");

  const predefinedRoles = ["Admin", "User", "Reader", "Writer" , "Editor"];

  useEffect(() => {
    getRoles().then(setRoles); // Fetch roles on mount
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddRole = () => {
    setCurrentRole({ name: "", permissions: [] });
    setModalOpen(true);
  };

  const handleEditRole = (id) => {
    const role = roles.find((r) => r.id === id);
    if (role) {
      setCurrentRole({ ...role });
      setModalOpen(true);
    }
  };

  const handleDeleteRole = (id) => {
    deleteRole(id)
      .then(() => {
        setNotification("Role deleted successfully");
        getRoles().then(setRoles); // Refresh the list after deletion
      })
      .catch((error) => {
        setNotification("Error deleting role");
        console.error(error);
      });
  };

  const handleSaveRole = () => {
    if (currentRole.name.trim() === "") {
      setNotification("Role name cannot be empty!");
      return;
    }

    if (!currentRole.permissions || currentRole.permissions.length === 0) {
      currentRole.permissions = []; // Set empty permissions explicitly
    }

    if (currentRole.id) {
      editRole(currentRole.id, currentRole)
        .then(() => {
          setNotification("Role updated successfully");
          getRoles().then(setRoles); // Refresh the list after editing
          setModalOpen(false);
        })
        .catch((error) => {
          setNotification("Error updating role");
          console.error(error);
        });
    } else {
      addRole(currentRole)
        .then(() => {
          setNotification("Role added successfully");
          getRoles().then(setRoles); // Refresh the list after adding
          setModalOpen(false);
        })
        .catch((error) => {
          setNotification("Error adding role");
          console.error(error);
        });
    }
  };

  const closeNotification = () => setNotification("");

  return (
    <div className="role-management">
      <button className="add-role-btn" onClick={handleAddRole}>
        Add Role
      </button>
      <ul className="role-list">
        {roles.map((role) => (
          <li key={role.id} className="role-item">
            <div>
              <strong>{role.name}</strong> - Permissions:{" "}
              {role.permissions.length > 0
                ? role.permissions.join(", ")
                : "No permissions assigned"}
            </div>
            <div className="role-actions">
              <button
                className="edit-btn"
                onClick={() => handleEditRole(role.id)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteRole(role.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentRole.id ? "Edit Role" : "Add Role"}</h3>
            <label>
              Role Name:
              <select
                value={currentRole.name}
                onChange={(e) =>
                  setCurrentRole({ ...currentRole, name: e.target.value })
                }
              >
                <option value="">Select a Role</option>
                {predefinedRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Permissions:
              <select
                value={currentRole.permissions.join(",") || ""}
                onChange={(e) =>
                  setCurrentRole({
                    ...currentRole,
                    permissions: e.target.value
                      ? e.target.value.split(",")
                      : [],
                  })
                }
              >
                <option value="">No Permission</option>
                <option value="Read">Read</option>
                <option value="Write">Write</option>
                <option value="Read,Write">Read and Write</option>
              </select>
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveRole}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setModalOpen(false)}
              >
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

export default RoleList;
