import useFetch from "./use-fetch";

function ProposalsComp(jobId) {
  console.log("Fetching proposals for job ID:", jobId);
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/proposals?jobId=${jobId.jobId}`,
  );

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
            <h3>{proposal.title}</h3>
            <p>{proposal.bid}</p>
          </div>
        ))}
    </div>
  );
}

export default ProposalsComp;
