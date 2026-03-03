const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const allowRoles = require("./middleware/roleMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Event Approval System API Running");
});


// ✅ NEW: Session restore route
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email, role_id FROM users WHERE id = $1",
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user
  });
});

app.get(
  "/api/admin-only",
  authMiddleware,
  allowRoles("Admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

app.get(
  "/api/club-only",
  authMiddleware,
  allowRoles("Club"),
  (req, res) => {
    res.json({ message: "Welcome Club User!" });
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

pool.query("SELECT NOW()")
  .then(res => console.log("DB Connected:", res.rows))
  .catch(err => console.error("DB Error:", err));