import useFetch from "./use-fetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProposalsComp({ jobId }) {
  const navigate = useNavigate();
  const [rejectingId, setRejectingId] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);

  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/proposals?jobId=${jobId}`,
  );

  const handleAccept = (proposalId) => {
    setAcceptingId(proposalId);
    navigate(`/contract/${proposalId}`);
  };

  const handleReject = (proposalId) => {
    if (window.confirm("Are you sure you want to reject this proposal?")) {
      setRejectingId(proposalId);
      // Add rejection API call here
      setTimeout(() => setRejectingId(null), 1000);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading proposals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
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
            <h3 className="font-bold text-red-900">Error loading proposals</h3>
            <p className="text-red-700 text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Proposals Received
      </h2>

      {!data || data.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No proposals yet
          </h3>
          <p className="text-gray-600">
            Check back soon as freelancers submit their proposals
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((proposal) => (
            <div
              key={proposal.proposalID}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {proposal.prop_ownerID?.charAt(0).toUpperCase() || "F"}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {proposal.title || "Proposal"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Freelancer ID: {proposal.prop_ownerID}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ${proposal.bid}
                  </div>
                </div>
              </div>

              {/* Proposal Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-200">
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-1">
                    Bid Amount
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${proposal.bid}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-1">
                    Delivery Time
                  </p>
                  <p className="text-gray-900 font-semibold">5 days</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-1">
                    Rating
                  </p>
                  <p className="text-gray-900 font-semibold">
                    4.8/5 (12 reviews)
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-1">
                    Submitted
                  </p>
                  <p className="text-gray-900 font-semibold">2 hours ago</p>
                </div>
              </div>

              {/* Description */}
              {proposal.description && (
                <div className="mt-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    {proposal.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAccept(proposal.proposalID)}
                  disabled={acceptingId === proposal.proposalID}
                  className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {acceptingId === proposal.proposalID
                    ? "Accepting..."
                    : "Accept Proposal"}
                </button>
                <button
                  onClick={() => handleReject(proposal.proposalID)}
                  disabled={rejectingId === proposal.proposalID}
                  className="flex-1 px-4 py-3 border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {rejectingId === proposal.proposalID
                    ? "Rejecting..."
                    : "Reject"}
                </button>
                <button className="px-4 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProposalsComp;
