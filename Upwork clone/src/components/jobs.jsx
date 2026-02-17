import useFetch from "./use-fetch";

function Jobs() {
  const { data, loading, error } = useFetch("http://localhost:3000/api/jobs");
  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs: {error}</p>;
  return (
    <div>
      <h2>Jobs</h2>
      {data.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Budget: ${job.budget}</p>
        </div>
      ))}
      <br />
    </div>
  );
}

export default Jobs;
