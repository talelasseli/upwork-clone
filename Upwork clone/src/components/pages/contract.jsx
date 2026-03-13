import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../nav-bar";
import { Link } from "react-router-dom";

function Contract() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { proposalId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate dates
    if (new Date(formData.start_date) >= new Date(formData.end_date)) {
      setError("End date must be after start date");
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, proposalId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/my-contracts");
        }, 2000);
      } else {
        setError(data.error || "Failed to create contract");
      }
    } catch (err) {
      console.error("Request failed", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create Contract
            </h1>
            <p className="text-lg text-gray-600">
              Set up the contract details for proposal{" "}
              <span className="font-semibold">{proposalId}</span>
            </p>
          </div>

          {/* Success State */}
          {success && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900">
                    Contract created successfully!
                  </h3>
                  <p className="text-green-700 mt-1">
                    Redirecting to your contracts...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            {error && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
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
                    <h3 className="font-bold text-red-900">Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Duration Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Contract Duration
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Define the start and end dates for this contract engagement
                </p>

                {/* Date Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Start Date */}
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      required
                      min={today}
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    />
                    <p className="text-gray-600 text-sm mt-2">
                      When will the work begin?
                    </p>
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      required
                      min={formData.start_date || today}
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    />
                    <p className="text-gray-600 text-sm mt-2">
                      When will the work be completed?
                    </p>
                  </div>
                </div>

                {/* Duration Display */}
                {formData.start_date && formData.end_date && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-gray-900 font-semibold">
                      Duration:{" "}
                      <span className="text-green-600">
                        {Math.ceil(
                          (new Date(formData.end_date) -
                            new Date(formData.start_date)) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Terms Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Contract Information
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      Both parties agree to the contract terms once submitted
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      Work must be completed by the end date specified
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      Payment will be released upon successful completion
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      You can negotiate terms with the client if needed
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    success ||
                    !formData.start_date ||
                    !formData.end_date
                  }
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : success ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Contract Created
                    </>
                  ) : (
                    "Create Contract"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contract;
