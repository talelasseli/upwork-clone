import useFetch from "./use-fetch";
import { useNavigate } from "react-router-dom";

function ProposalsComp(jobId) {
  const navigate = useNavigate();
  console.log("Fetching proposals for job ID:", jobId);
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/proposals?jobId=${jobId.jobId}`,
  );

  const handleAccept = (proposalId) => {
    navigate(`/contract/${proposalId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Proposals</h1>

      {data &&
        data.map((proposal) => (
          <div key={proposal.proposalID} className="proposal-card">
            <p>{proposal.prop_ownerID}</p>
            <h3>{proposal.title}</h3>
            <p>{proposal.bid}</p>
            <button onClick={() => handleAccept(proposal.proposalID)}>
              Accept
            </button>
            <button>Reject</button>
          </div>
        ))}
    </div>
  );
}

export default ProposalsComp;
