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
    const [user] = await db.query(
      "SELECT userrole FROM users WHERE clerk_id = ?",
      [userId],
    );

    if (!user[0] || user[0].userrole !== "client") {
      return res
        .status(403)
        .json({ error: "Only clients are allowed to post jobs." });
    }

    const [result] = await db.query(
      "INSERT INTO jobs (title, description, budget, job_ownerID) VALUES (?, ?, ?, ?)",
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
  const { coverLetter, bid } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const [existing] = await db.query(
    "SELECT proposalID FROM proposals WHERE jobID = ? AND prop_ownerID = ?",
    [jobId, userId],
  );

  if (existing.length > 0) {
    // 2. If it exists, decline the request
    return res.status(400).json({
      error:
        "You have already submitted a proposal for this job. You cannot apply twice.",
    });
  }

  try {
    await db.query(
      "INSERT INTO proposals (jobID, prop_ownerID, title, bid, status) VALUES (?, ?, ?, ?, ?)",
      [jobId, userId, coverLetter, bid, "pending"],
    );
    res.json({ message: "Proposal submitted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//my jobs route
// Route: GET http://localhost:3000/api/jobs/my-jobs (Get Jobs of the logged-in user)
router.get("/my-jobs", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [jobs] = await db.query("SELECT * FROM jobs WHERE job_ownerID = ?", [
      userId,
    ]);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET http://localhost:3000/api/jobs/:id (Get Job by ID)
//get job  by id
router.get("/:id", async (req, res) => {
  const jobId = req.params.id;
  try {
    const [job] = await db.query("SELECT * FROM jobs WHERE jobID = ?", [jobId]);
    if (job.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete job by id
router.delete("/:id", async (req, res) => {
  const { userId } = getAuth(req);
  const jobId = req.params.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [job] = await db.query("SELECT * FROM jobs WHERE jobID = ?", [jobId]);
    if (job.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    if (job[0].job_ownerID !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own jobs." });
    }
    await db.query("DELETE FROM jobs WHERE jobID = ?", [jobId]);
    res.json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
