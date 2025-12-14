import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <h3
        className="navbar-title"
        onClick={() => navigate("/dashboard")}
      >
        Sweet Shop
      </h3>

      {user && (
        <div className="navbar-actions">
          <span className="navbar-role">
            {user.role === "admin" ? "Admin" : "User"}
          </span>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className="navbar-btn"
            onClick={() => navigate("/cart")}
          >
            Cart ({cart.length})
          </button>

          <button
            className="navbar-btn logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
