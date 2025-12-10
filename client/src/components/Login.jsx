import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api"; // import the instance

const Login = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/login", formData);
      sessionStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/posts"); // redirect to posts page
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-section">
      <h2>Log In</h2>
      {message && <p className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="auth-footer">
        <p>
          Don't have an account?{" "}
          <button className="toggle-button" onClick={onToggleForm}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
