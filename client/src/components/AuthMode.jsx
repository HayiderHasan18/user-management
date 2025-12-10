import { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./SignUp";
import './Auth.css';
import queueImage from "../assets/Screenshot 2025-12-10 090550.png";

export default function AuthMode() {
  const [showLogin, setShowLogin] = useState(true);
  const handleToggleForm = () => setShowLogin(!showLogin);

  return (
    <div className="auth-modal-overlay">
      <div className="auth-card">

        <div
          className="auth-image-section"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${queueImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-content">
            <h2>{showLogin ? "Welcome Back" : "Join Our System"}</h2>
            <p>
              {showLogin
                ? "Please login with your credentials to access our User Management System"
                : "Register now to get started with our comprehensive User management system."}
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          {showLogin ? (
            <LoginForm onToggleForm={handleToggleForm} />
          ) : (
            <SignupForm onToggleForm={handleToggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}
