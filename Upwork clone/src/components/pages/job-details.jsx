import { useParams } from "react-router-dom";
import useFetch from "../use-fetch";
import { FreelancerOnly } from "../role-views";
import { ClientOnly } from "../role-views";
import ApplyForm from "../apply-form";
import ProposalsComp from "../proposals";
function JobDetails() {
  const { jobID } = useParams(); // Grabs the 'id' from the URL (/jobs/:id)
  const {
    data: job,
    loading,
    error,
  } = useFetch(`http://localhost:3000/api/jobs/${jobID}`);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p className="budget">Budget: ${job.budget}</p>
      <div className="description">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>
    
      <ClientOnly>
        <ProposalsComp jobId={jobID} />
      </ClientOnly>

      {/* If the user is a freelancer, show the apply button */}
      <FreelancerOnly>
        <ApplyForm />
      </FreelancerOnly>
    </div>
  );
}

export default JobDetails;
