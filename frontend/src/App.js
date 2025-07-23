import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import StaffLoginForm from './components/auth/StaffLoginForm';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!currentUser ? <Navigate to="/login" /> : <HomePage />} />
      <Route path="/home" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/about" element={currentUser ? <AboutPage /> : <Navigate to="/login" />} />
      <Route path="/contact" element={currentUser ? <ContactPage /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={currentUser ? <ProfessionalDashboard /> : <Navigate to="/login" />} />
      
      {/* Auth routes with shared layout */}
      <Route element={<AuthPage />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/staff-login" element={<StaffLoginForm />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
