import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

export default function ApplyForm() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const jobID = useParams().jobID; // Get the job ID from the URL
  const [formData, setFormData] = useState({
    title: "",
    coverLetter: "",
    bid: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken(); // Get the secure token from Clerk

      const response = await fetch(
        `http://localhost:3000/api/jobs/${jobID}/proposals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token to backend
          },
          body: JSON.stringify({ ...formData, status: "pending" }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Proposal Submitted Successfully!");
        navigate("/jobs"); // Redirect to the jobs list
      } else {
        alert(data.error || "Failed to submit proposal");
      }
    } catch (err) {
      console.error("Request failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h1>Apply for this Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cover Letter</label>
          <br />
          <textarea
            required
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e.target.value })
            }
          />
        </div>

        <div>
          <label>Bid ($)</label>
          <br />
          <input
            type="number"
            required
            value={formData.bid}
            onChange={(e) => setFormData({ ...formData, bid: e.target.value })}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
}
