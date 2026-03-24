import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../use-fetch";
import { FreelancerOnly } from "../role-views";
import { ClientOnly } from "../role-views";
import ApplyForm from "../apply-form";
import ProposalsComp from "../proposals";
import Navbar from "../nav-bar";

function JobDetails() {
  const { jobID } = useParams();
  const navigate = useNavigate();
  const {
    data: job,
    loading,
    error,
  } = useFetch(`http://localhost:3000/api/jobs/${jobID}`);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Loading job details...
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="flex gap-4">
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
                  <h3 className="font-bold text-red-900">Error loading job</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-16">
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Job not found
              </h3>
              <p className="text-gray-600 mb-8">
                The job you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate("/jobs")}
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center gap-2 mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2">
              {/* Job Header */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <p className="text-gray-600">
                      Posted {job.created_at?.split("T")[0]}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    {job.status || "Open"}
                  </span>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-gray-600 text-xs font-medium mb-2">
                      Budget{" "}
                      {job.budget_type === "fixed"
                        ? "(Fixed Price)"
                        : "(Hourly Rate)"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${job.budget}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-medium mb-2">
                      Timeline
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {job.timeline}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-medium mb-2">
                      Level
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {job.level}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About this project
                </h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Skills Required */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Skills required
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "PostgreSQL"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Client Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About the client
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      John Developer
                    </p>
                    <p className="text-gray-600 text-sm">
                      Verified client • 5 jobs posted
                    </p>
                  </div>
                </div>
              </div>

              {/* Freelancer Apply Form */}
              <FreelancerOnly>
                <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                  <ApplyForm />
                </div>
              </FreelancerOnly>

              {/* Client Proposals */}
              <ClientOnly>
                <div className="mt-8">
                  <ProposalsComp jobId={jobID} />
                </div>
              </ClientOnly>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply CTA */}
              <FreelancerOnly>
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Ready to apply?
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Submit your proposal to show the client why you're the
                    perfect fit for this project.
                  </p>
                  <button className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-3">
                    Submit Proposal
                  </button>
                  <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                    Save Job
                  </button>
                </div>
              </FreelancerOnly>

              {/* Client Actions */}
              <ClientOnly>
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Job Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Proposals
                      </p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Views
                      </p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-medium mb-1">
                        Posted
                      </p>
                      <p className="text-gray-900 font-medium">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
