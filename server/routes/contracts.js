const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getAuth } = require("@clerk/express");

// Route: POST http://localhost:3000/api/contracts
router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { proposalId, start_date, end_date } = req.body;
  const [info] = await db.query(
    "SELECT * FROM proposals WHERE proposalID = ?",
    [proposalId],
  );
  if (info.length === 0) {
    return res.status(404).json({ error: "Proposal not found" });
  }
  const jobId = info[0].jobID;
  const price = info[0].bid;
  const freelancerId = info[0].prop_ownerID;
  try {
    // Check if the user is the job owner
    const [job] = await db.query("SELECT * FROM jobs WHERE jobID = ?", [jobId]);

    if (job.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job[0].job_ownerID !== userId) {
      return res
        .status(403)
        .json({ error: "Only the job owner can create a contract" });
    }
    //check if the proposalalready has a contract
    const [existingContract] = await db.query(
      "SELECT * FROM contracts WHERE proposalID = ?",
      [proposalId],
    );
    if (existingContract.length > 0) {
      return res
        .status(400)
        .json({ error: "Contract already exists for this proposal" });
    }

    // Create contract
    const [result] = await db.query(
      "INSERT INTO contracts (jobID, proposalID, client_id, freelancer_id, status, price, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        jobId,
        proposalId,
        userId,
        freelancerId,
        "pending",
        price,
        start_date,
        end_date,
      ], // freelancerID will be set when the freelancer accepts the contract
    );
    res.json({ message: "Contract created!", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get contract by user id
// Route: GET http://localhost:3000/api/contracts/my-contracts
router.get("/my-contracts", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [contracts] = await db.query(
      `SELECT c.*, j.title FROM contracts c JOIN jobs j ON c.jobID = j.jobID WHERE c.client_id = ? OR c.freelancer_id = ?`,
      [userId, userId],
    );
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update contract status to accepted by freelancer
// Route: POST http://localhost:3000/api/contracts/:id/accept
router.post("/:id/accept", async (req, res) => {
  const { userId } = getAuth(req);
  const contractId = req.params.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [contract] = await db.query("SELECT * FROM contracts WHERE id = ?", [
      contractId,
    ]);
    if (contract.length === 0) {
      return res.status(404).json({ error: "Contract not found" });
    }
    if (contract[0].freelancer_id !== userId) {
      return res.status(403).json({
        error: "Only the assigned freelancer can accept this contract",
      });
    }
    if (contract[0].status !== "pending") {
      return res
        .status(400)
        .json({ error: "Only pending contracts can be accepted" });
    }

    await db.query("UPDATE contracts SET status = 'accepted' WHERE id = ?", [
      contractId,
    ]);
    res.json({ message: "Contract accepted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
