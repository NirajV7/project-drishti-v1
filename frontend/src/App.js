import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import StaffLoginForm from './components/staff/StaffLoginForm'; // Assuming you still want this
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { currentUser, userRole } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser
            ? (userRole === 'commander' || userRole === 'admin')
              ? <Navigate to="/dashboard" />
              : <Navigate to="/home" />
            : <Navigate to="/login" />
        }
      />
      <Route
        path="/"
        element={!currentUser ? <AuthPage /> : (userRole === 'commander' || userRole === 'admin') ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
      >
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="staff-login" element={<StaffLoginForm />} />
      </Route>
      <Route
        path="/home"
        element={currentUser && userRole !== 'commander' && userRole !== 'admin' ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={currentUser && (userRole === 'commander' || userRole === 'admin') ? <ProfessionalDashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
