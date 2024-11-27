import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Use this CSS file for styling

const Dashboard = () => (
  <div className="dashboard-page">
    {/* Decorative Elements */}
    <div className="circle-decor top-left"></div>
    <div className="circle-decor bottom-right"></div>
    
    {/* Main Container */}
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Welcome to the Admin Dashboard</h1>
        <p className="dashboard-quote">"Empower your ideas and make them a reality."</p>
        <Link to="/rbac" className="rbac-button">Manage RBAC</Link>
      </div>
    </div>
  </div>
);

export default Dashboard;
