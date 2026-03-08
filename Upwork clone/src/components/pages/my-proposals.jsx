import useFetch from "../use-fetch";
import { useAuth } from "@clerk/clerk-react";

function Proposals() {
  const { getToken } = useAuth();

  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/proposals/my-proposals",
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = async (proposalId) => {
    console.log("Deleting proposal with ID:", proposalId);
    const token = await getToken();
    try {
      const response = await fetch(
        `http://localhost:3000/api/proposals/${proposalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete proposal");
      }
    } catch (err) {
      console.error("Error deleting proposal:", err);
    }
  };
  return (
    <div>
      <h1>My Proposals</h1>
      {data &&
        data.map((proposal) => (
          <div key={proposal.proposalID} className="proposal-card">
            <h2>{proposal.jobTitle}</h2>
            <h3>{proposal.title}</h3>
            <p>{proposal.bid}</p>
            <h4>Status: {proposal.status}</h4>
            <button onClick={() => handleDelete(proposal.proposalID)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default Proposals;
