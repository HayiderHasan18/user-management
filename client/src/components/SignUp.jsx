import React, { useState } from "react";
import axiosInstance from "../services/api"; // import your instance

const SignUp = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, firstname, lastname, email, password } = formData;
    const newErrors = {};

    if (!username) newErrors.username = "Username is required.";
    if (!firstname) newErrors.firstname = "First name is required.";
    if (!lastname) newErrors.lastname = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (password && password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/register", formData);

      setMessage("Signup successful! You can now log in.");

      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });

      setErrors({});
    } catch (err) {
      setMessage(
        err.response?.data?.msg || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-section">
      <h2>Sign Up</h2>

      {message && (
        <p className={`message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-grid">

        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className={errors.firstname ? "error" : ""}
          />
          {errors.firstname && <p className="error-message">{errors.firstname}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className={errors.lastname ? "error" : ""}
          />
          {errors.lastname && <p className="error-message">{errors.lastname}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 chars)"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="toggle-link-container">
        Already have an account?{" "}
        <button onClick={onToggleForm} className="toggle-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
