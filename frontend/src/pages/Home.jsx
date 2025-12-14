import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
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

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <header className="home-navbar">
        <h2 className="brand">Sweet Shop</h2>

        <div className="nav-right">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
          <button
            className="mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Smart <span>Sweet Shop</span> Management
          </h1>

          <p>
            The Sweet Shop Management System is designed to simplify daily shop operations with a clean and easy-to-use interface. It helps manage inventory, track stock levels, process customer orders, and handle sales efficiently. With real-time updates and organized data, shop owners and staff can reduce manual work, avoid stock issues, and ensure smooth, accurate billing and order management in a real-world sweet shop environment.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

<div className="hero-card">
  <div className="image-box">
    <img
      src="https://static.vecteezy.com/system/resources/previews/057/147/238/non_2x/magnificent-artistic-cute-3d-candy-shop-illustration-authentic-free-png.png"
      alt="Sweet Shop Management"
    />
  </div>
</div>


       <div className="hero-card2">
  <div className="glow-box">
    <h3>Why Sweet Shop?</h3>
    <ul>
      <li>Clean and intuitive dashboard UI</li>
      <li>Fast billing with smart cart handling</li>
      <li>Real-time stock and price management</li>
      <li>Role-based access for staff and admin</li>
      <li>Sales reports and order history tracking</li>
      <li>Low-stock alerts and restock support</li>
      <li>Dark and light modes for long working hours</li>
    </ul>
  </div>
</div>


        <div className="hero-card2 hero-profile">
  <div className="profile-box">
    <img
      src="/profile.jpg"
      alt="Sachin"
      className="profile-img"
    />

    <h3>Sachin</h3>

    <p className="profile-desc">
      Software engineer passionate about building clean, scalable web
      applications with modern UI and solid backend logic.
    </p>

    <a
      href="https://drive.google.com/file/d/1kiXcPjQWWrn1wCBkkRve1BBC0RuACmpU/view"
      target="_blank"
      rel="noopener noreferrer"
      className="resume-btn"
    >
      View Resume
    </a>
  </div>
</div>


      </section>
    </div>
  );
};

export default Home;
