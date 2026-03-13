import useFetch from "../use-fetch";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import Navbar from "../nav-bar";

function MyJobs() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/jobs/my-jobs",
  );
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [deletingId, setDeletingId] = useState(null);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setDeletingId(jobId);
      try {
        const token = await getToken();
        const response = await fetch(
          `http://localhost:3000/api/jobs/${jobId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error("Failed to delete job");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job. Please try again.");
        setDeletingId(null);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  My Jobs
                </h1>
                <p className="text-gray-600">
                  Manage your posted projects and monitor proposals
                </p>
              </div>
              <Link
                to="/post-job"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                Post a New Job
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Loading your jobs...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex gap-3">
                <svg
                  className="w-6 h-6 text-red-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-red-900">Error loading jobs</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && data?.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No jobs yet
              </h3>
              <p className="text-gray-600 mb-8">
                Start posting jobs to attract freelancers and grow your team
              </p>
              <Link
                to="/post-job"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Post Your First Job
              </Link>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && !error && data?.length > 0 && (
            <div className="grid gap-6">
              {data.map((job) => (
                <div
                  key={job.jobID}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 hover:text-green-600 cursor-pointer mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Job Meta */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Budget
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${job.budget}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Status
                      </p>
                      <p className="text-gray-900 font-medium">Open</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Proposals
                      </p>
                      <p className="text-gray-900 font-medium">0</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Posted
                      </p>
                      <p className="text-gray-900 font-medium">Today</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleJobClick(job.jobID)}
                      className="flex-1 px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(job.jobID)}
                      disabled={deletingId === job.jobID}
                      className="flex-1 px-4 py-2 border border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === job.jobID ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyJobs;
