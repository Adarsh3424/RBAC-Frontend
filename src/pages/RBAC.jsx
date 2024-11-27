import React from "react";
import UserList from "../components/UserManagement/UserList";
import RoleList from "../components/RoleManagement/RoleList";
import "./RBAC.css"; // Import the new CSS file for styling

const RBAC = () => (
  <div className="rbac">
    <h1 className="rbac-title">Role-Based Access Control</h1>
    <div className="rbac-container">
      <div className="rbac-card">
        <h2>User Management</h2>
        <UserList />
      </div>
      <div className="rbac-card">
        <h2>Role Management</h2>
        <RoleList />
      </div>
    </div>
  </div>
);

export default RBAC;
