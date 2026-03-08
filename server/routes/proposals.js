const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getAuth } = require("@clerk/express");

//My proposals
// Route: GET http://localhost:3000/api/proposals/my-proposals
router.get("/my-proposals", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [proposals] = await db.query(
      ` SELECT 
      p.*, 
      j.title AS jobTitle 
    FROM proposals p 
    JOIN jobs j ON p.jobID = j.jobID 
    WHERE p.prop_ownerID = ?`,
      [userId],
    );
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete proposal by id
// Route: DELETE http://localhost:3000/api/proposals/:id
router.delete("/:id", async (req, res) => {
  const { userId } = getAuth(req);
  const proposalId = req.params.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [proposal] = await db.query(
      "SELECT * FROM proposals WHERE proposalID = ?",
      [proposalId],
    );
    if (proposal.length === 0) {
      return res.status(404).json({ error: "Proposal not found" });
    }
    if (proposal[0].prop_ownerID !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own proposals" });
    }

    await db.query("DELETE FROM proposals WHERE proposalID = ?", [proposalId]);
    res.json({ message: "Proposal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch proposals for a specific job
// Route: GET http://localhost:3000/api/proposals?jobId=123
router.get("/", async (req, res) => {
  const jobId = req.query.jobId;
  if (!jobId) {
    return res.status(400).json({ error: "Missing jobId query parameter" });
  }

  try {
    const [proposals] = await db.query(
      `SELECT * FROM proposals WHERE jobID = ?`,
      [jobId],
    );
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
