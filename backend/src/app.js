const sweetRoutes = require("./routes/sweet.routes");
const orderRoutes = require("./routes/order.routes");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop API running");
});

app.post("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

module.exports = app;
