import useFetch from "../use-fetch";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import Navbar from "../nav-bar";
import { Link } from "react-router-dom";

function Proposals() {
  const { getToken } = useAuth();
  const [deletingId, setDeletingId] = useState(null);

  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/proposals/my-proposals",
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "rejected":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };
  console.log("Proposals data:", data);

  const handleDelete = async (proposalId) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      setDeletingId(proposalId);
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
          setDeletingId(null);
        }
      } catch (err) {
        console.error("Error deleting proposal:", err);
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
                  My Proposals
                </h1>
                <p className="text-gray-600">
                  Track and manage your submitted proposals
                </p>
              </div>
              <Link
                to="/jobs"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                Find More Jobs
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Loading your proposals...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
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
                  <h3 className="font-bold text-red-900">
                    Error loading proposals
                  </h3>
                  <p className="text-red-700">{error.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!data || data.length === 0) && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No proposals yet
              </h3>
              <p className="text-gray-600 mb-8">
                Start by submitting proposals on jobs that match your skills
              </p>
              <Link
                to="/jobs"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          )}

          {/* Proposals Grid */}
          {!loading && !error && data && data.length > 0 && (
            <>
              <div className="mb-6 text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">{data.length}</span>{" "}
                proposal{data.length !== 1 ? "s" : ""}
              </div>
              <div className="grid gap-6">
                {data.map((proposal) => (
                  <div
                    key={proposal.proposalID}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {proposal.jobTitle}
                        </h3>
                        {proposal.title && (
                          <p className="text-gray-600 text-sm mb-3">
                            Proposal: {proposal.title}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(proposal.status)}`}
                        >
                          {getStatusIcon(proposal.status)}
                          {proposal.status?.charAt(0).toUpperCase() +
                            proposal.status?.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* Proposal Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Your Bid
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          ${proposal.bid}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Status
                        </p>
                        <p className="text-gray-900 font-semibold capitalize">
                          {proposal.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Submitted
                        </p>
                        <p className="text-gray-900 font-semibold">
                          2 days ago
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Last Updated
                        </p>
                        <p className="text-gray-900 font-semibold">1 day ago</p>
                      </div>
                    </div>

                    {/* Status-based Message */}
                    {proposal.status?.toLowerCase() === "pending" && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          The client is reviewing your proposal. Check back soon
                          for updates.
                        </p>
                      </div>
                    )}

                    {proposal.status?.toLowerCase() === "accepted" && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm font-medium">
                          Congratulations! Your proposal was accepted. Check
                          your contracts section for next steps.
                        </p>
                      </div>
                    )}

                    {proposal.status?.toLowerCase() === "rejected" && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">
                          This proposal was rejected. You can submit a new
                          proposal for similar projects.
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(proposal.proposalID)}
                        disabled={deletingId === proposal.proposalID}
                        className="flex-1 px-4 py-2 border border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === proposal.proposalID
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Proposals;
