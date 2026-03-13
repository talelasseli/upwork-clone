import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ApplyForm() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const jobID = useParams().jobID;
  const [formData, setFormData] = useState({
    title: "",
    coverLetter: "",
    bid: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      const response = await fetch(
        `http://localhost:3000/api/jobs/${jobID}/proposals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, status: "pending" }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/my-proposals");
        }, 2000);
      } else {
        setError(data.error || "Failed to submit proposal");
      }
    } catch (err) {
      console.error("Request failed", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Submit Your Proposal
      </h2>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-bold text-green-900">Proposal submitted!</h3>
              <p className="text-green-700 text-sm">
                Redirecting to your proposals...
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
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
              <h3 className="font-bold text-red-900">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cover Letter */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            Why are you a great fit for this project?
          </label>
          <textarea
            required
            placeholder="Explain your relevant experience, what excites you about this project, and how you can deliver exceptional results..."
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all resize-none"
          />
          <p className="text-gray-600 text-sm mt-2">
            A strong cover letter increases your chances of being selected
          </p>
        </div>

        {/* Bid Amount */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            Your bid (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold">
              $
            </span>
            <input
              type="number"
              required
              placeholder="Enter your proposed bid"
              value={formData.bid}
              onChange={(e) =>
                setFormData({ ...formData, bid: e.target.value })
              }
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
            />
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Competitive bids are more likely to be accepted
          </p>
        </div>

        {/* Info Box */}
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
            Tips for a winning proposal
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Personalize your message - show you've read the job description
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Highlight relevant past projects and experience</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Be professional and proofread your cover letter</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Set a competitive price that reflects your experience</span>
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className="w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : success ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Proposal Submitted
            </>
          ) : (
            "Submit Proposal"
          )}
        </button>
      </form>
    </div>
  );
}
