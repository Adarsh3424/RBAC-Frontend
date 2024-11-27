import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RBAC from "./pages/RBAC";
import "./styles/App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rbac" element={<RBAC />} />
    </Routes>
  </Router>
);

export default App;
