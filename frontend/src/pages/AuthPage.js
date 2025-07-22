import React from 'react';
import BrandingPanel from '../components/layout/BrandingPanel';
import { Outlet } from 'react-router-dom';
import '../components/auth/Auth.css';

function AuthPage() {
  return (
    <div className="registration-root">
      <BrandingPanel />
      <div className="registration-right">
        <div className="registration-form-container">
          <Outlet /> {/* This will render either LoginForm or SignupForm */}
        </div>
      </div>
    </div>
  );
}

export default AuthPage; 