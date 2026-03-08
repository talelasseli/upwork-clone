import useFetch from "../use-fetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function MyJobs() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/jobs/my-jobs",
  );
  const navigate = useNavigate();
  const { getToken } = useAuth();

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs: {error}</p>;

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };
  const handleDelete = async (jobId) => {
    const token = await getToken();
    fetch(`http://localhost:3000/api/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error("Failed to delete job");
        }
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };
  return (
    <div>
      <h2>My Jobs</h2>
      {data.map((job) => (
        <div key={job.jobID} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Budget: ${job.budget}</p>
          <button onClick={() => handleJobClick(job.jobID)}>
            View Details
          </button>
          <button onClick={() => handleDelete(job.jobID)}>Delete</button>
        </div>
      ))}
      <br />
    </div>
  );
}

export default MyJobs;
