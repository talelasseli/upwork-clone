import useFetch from "./use-fetch";
import { useNavigate } from "react-router-dom";
function Jobs() {
  const { data, loading, error } = useFetch("http://localhost:3000/api/jobs");
  const navigate = useNavigate();
  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs: {error}</p>;

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };
  return (
    <div>
      <h2>Jobs</h2>
      {data.map((job) => (
        <div
          key={job.jobID}
          className="job-card"
          onClick={() => handleJobClick(job.jobID)}
        >
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
