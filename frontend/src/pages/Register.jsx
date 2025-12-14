import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
        role
      });
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Create your account</h2>
        <p className="register-subtitle">
          Join Sweet Shop and get started
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="register-input"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
  className="register-input"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>


          <button className="register-btn" type="submit">
            Create account
          </button>
        </form>

        <div className="register-footer">
          <span
            className="register-link"
            onClick={() => navigate("/")}
          >
            Home
          </span>

          <span
            className="login-link"
            onClick={() => navigate("/Login")}
          >
            Already have an account?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
