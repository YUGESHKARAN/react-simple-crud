import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoutes";

import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage"; // Corrected casing
import HomePage from "./components/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes for Login & Register */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Route */}
          <Route
            path="/home"
            element={<ProtectedRoute element={<HomePage />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
