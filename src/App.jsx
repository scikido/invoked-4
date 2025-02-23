// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ParentDashboard from "./pages/ParentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth isSignup={true} />} />
        <Route path="/login" element={<Auth isSignup={false} />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
