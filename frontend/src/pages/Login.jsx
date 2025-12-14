import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { AuthContext } from "../context/AuthContext.js";
import "./Login.css";
import "./Home.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Good to see you again</h2>
        <p className="login-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Sign in
          </button>
        </form>

        <div className="login-footer">
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Don’t have an account?
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
