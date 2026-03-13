import { useAuth } from "@clerk/clerk-react";
import useFetch from "../use-fetch";
import { useState } from "react";
import Navbar from "../nav-bar";
import { Link } from "react-router-dom";

function Contracts() {
  const { getToken } = useAuth();
  const { userId } = useAuth();
  const [acceptingId, setAcceptingId] = useState(null);

  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/contracts/my-contracts`,
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "completed":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleAccept = async (contractId) => {
    if (window.confirm("Are you sure you want to accept this contract?")) {
      setAcceptingId(contractId);
      try {
        const token = await getToken();
        const response = await fetch(
          `http://localhost:3000/api/contracts/${contractId}/accept`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          alert("Contract accepted successfully!");
          window.location.reload();
        } else {
          alert(data.error || "Failed to accept contract");
        }
      } catch (err) {
        console.error("Request failed", err);
        alert("Failed to accept contract");
      } finally {
        setAcceptingId(null);
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
                  My Contracts
                </h1>
                <p className="text-gray-600">
                  Manage active contracts and track project progress
                </p>
              </div>
              <Link
                to="/jobs"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                Find New Work
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Loading your contracts...
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
                    Error loading contracts
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
                No contracts yet
              </h3>
              <p className="text-gray-600 mb-8">
                Start accepting proposals to create contracts
              </p>
              <Link
                to="/jobs"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Find Jobs
              </Link>
            </div>
          )}

          {/* Contracts Grid */}
          {!loading && !error && data && data.length > 0 && (
            <>
              <div className="mb-6 text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">{data.length}</span>{" "}
                contract{data.length !== 1 ? "s" : ""}
              </div>
              <div className="grid gap-6">
                {data.map((contract) => (
                  <div
                    key={contract.contractID}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {contract.title || "Project Contract"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Contract ID: {contract.contractID}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(contract.status)}`}
                        >
                          {getStatusIcon(contract.status)}
                          {contract.status?.charAt(0).toUpperCase() +
                            contract.status?.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* Contract Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Client
                        </p>
                        <p className="text-gray-900 font-semibold truncate">
                          {contract.client_id || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Freelancer
                        </p>
                        <p className="text-gray-900 font-semibold truncate">
                          {contract.freelancer_id || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Start Date
                        </p>
                        <p className="text-gray-900 font-semibold">
                          Jan 15, 2024
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          End Date
                        </p>
                        <p className="text-gray-900 font-semibold">
                          Feb 15, 2024
                        </p>
                      </div>
                    </div>

                    {/* Status Messages */}
                    {contract.status?.toLowerCase() === "pending" && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm font-medium">
                          This contract is awaiting your acceptance. Review the
                          terms and accept to begin work.
                        </p>
                      </div>
                    )}

                    {contract.status?.toLowerCase() === "active" && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm font-medium">
                          Contract is active. Work on this project and keep the
                          client updated on progress.
                        </p>
                      </div>
                    )}

                    {contract.status?.toLowerCase() === "completed" && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm font-medium">
                          This contract has been completed. Payment has been
                          processed.
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
                        View Details
                      </button>
                      {userId === contract.freelancer_id &&
                        contract.status?.toLowerCase() === "pending" && (
                          <button
                            onClick={() => handleAccept(contract.contractID)}
                            disabled={acceptingId === contract.contractID}
                            className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {acceptingId === contract.contractID
                              ? "Accepting..."
                              : "Accept Contract"}
                          </button>
                        )}
                      {contract.status?.toLowerCase() !== "pending" && (
                        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                          Message Client
                        </button>
                      )}
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

export default Contracts;
