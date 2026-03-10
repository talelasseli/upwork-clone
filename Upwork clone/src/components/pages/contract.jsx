import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
function Contract() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getToken(); // Get the secure token from Clerk

      fetch("http://localhost:3000/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token to backend
        },
        body: JSON.stringify({ ...formData, proposalId }), // Include proposalId in the request body
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Contract created successfully!");
          }
        })
        .catch((err) => {
          console.error("Request failed", err);
          alert("Failed to create contract");
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Token retrieval failed", err);
      alert("Failed to create contract");
      setLoading(false);
    }
  };

  const { proposalId } = useParams();
  return (
    <div>
      <h1>Contract for Proposal {proposalId}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Duration:
          <label>
            start date:
            <input
              type="date"
              name="start_date"
              required
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </label>
          <label>
            end date:
            <input
              type="date"
              name="end_date"
              required
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </label>
        </label>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contract;
