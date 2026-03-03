const pool = require("../config/db");

const allowRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        `SELECT r.name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.id = $1`,
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(403).json({ message: "User role not found" });
      }

      const userRole = result.rows[0].name;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: `Access denied. Requires role: ${allowedRoles.join(", ")}`
        });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = allowRoles;