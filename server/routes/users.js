const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getAuth } = require("@clerk/express");

// Route: POST http://localhost:3000/api/users/sync
// Description: Syncs Clerk User with MySQL
router.post("/sync", async (req, res) => {
  const { userId } = getAuth(req);
  const { email, username } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE clerk_id = ?", [
      userId,
    ]);

    if (users.length === 0) {
      // Create user if not exists
      await db.query(
        "INSERT INTO users (clerk_id, email, username, userrole) VALUES (?, ?, ?, ?)",
        [userId, email, username, req.body.userrole],
      );
      return res.json({ message: "User created in MySQL" });
    }

    res.json({ message: "User already synced" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET http://localhost:3000/api/users/me
router.get("/me", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [users] = await db.query("SELECT * FROM users WHERE clerk_id = ?", [
      userId,
    ]);
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
