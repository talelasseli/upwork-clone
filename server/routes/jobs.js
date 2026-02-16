const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getAuth } = require("@clerk/express");

// Route: GET http://localhost:3000/api/jobs
router.get("/", async (req, res) => {
  try {
    const [jobs] = await db.query("SELECT * FROM jobs");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: POST http://localhost:3000/api/jobs (Create a Job)
router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { title, description, budget } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO jobs (title, description, budget, employer_clerk_id) VALUES (?, ?, ?, ?)",
      [title, description, budget, userId],
    );
    res.json({ message: "Job posted!", jobId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: POST http://localhost:3000/api/jobs/:id/proposals
router.post("/:id/proposals", async (req, res) => {
  const { userId } = getAuth(req);
  const jobId = req.params.id;
  const { coverLetter, bidAmount } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    await db.query(
      "INSERT INTO proposals (jobID, clerk_id, cover_letter, bid) VALUES (?, ?, ?, ?)",
      [jobId, userId, coverLetter, bidAmount],
    );
    res.json({ message: "Proposal submitted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
