const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getAuth } = require("@clerk/express");
const { clerkClient } = require("@clerk/clerk-sdk-node");

// Route: POST http://localhost:3000/api/users/sync
// Description: Syncs Clerk User with MySQL
router.post("/sync", async (req, res) => {
  const { userId } = getAuth(req);
  const { email, username, userrole } = req.body;

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

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userrole: userrole,
      },
    });
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

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "User not found in database" });
    }

    res.json(users[0]); // Now we are sure users[0] exists
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update user role
// Route: PUT http://localhost:3000/api/users/update-role
router.put("/update-role", async (req, res) => {
  const { userId } = getAuth(req);
  const { userrole } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    // 1. Update your local database (What you already had)
    await db.query("UPDATE users SET userrole = ? WHERE clerk_id = ?", [
      userrole,
      userId,
    ]);

    // 2. TELL CLERK TO UPDATE PUBLIC METADATA (You need to add this!)
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userrole: userrole,
      },
    });

    res.json({ message: "User role updated successfully" });
  } catch (err) {
    console.error("Backend Error:", err); // Add this to see if Clerk throws an error!
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
