import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav-bar";
import { Link } from "react-router-dom";

export default function PostJob() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    budgetType: "fixed",
    category: "",
    skills: [],
    level: "intermediate",
    timeline: "1-3 months",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Data Science",
    "DevOps",
    "Cloud Architecture",
    "Database Design",
    "Other",
  ];

  const skillOptions = [
    "React",
    "Node.js",
    "Python",
    "Vue.js",
    "TypeScript",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
  ];

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job Posted Successfully!");
        navigate("/my-jobs");
      } else {
        alert(data.error || "Failed to post job");
      }
    } catch (err) {
      console.error("Request failed", err);
    } finally {
      setLoading(false);
    }
  };

  const isStep1Complete = formData.title && formData.category;
  const isStep2Complete = formData.description && formData.skills.length > 0;
  const isStep3Complete =
    formData.budget && formData.level && formData.timeline;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/my-jobs"
              className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center gap-2 mb-6"
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
              Back to My Jobs
            </Link>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              Post a Job
            </h1>
            <p className="text-lg text-gray-600">
              Describe your project and find the perfect freelancer to bring it
              to life
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[
                { number: 1, label: "Project Details" },
                { number: 2, label: "Description & Skills" },
                { number: 3, label: "Budget & Timeline" },
              ].map((item, index) => (
                <div
                  key={item.number}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 z-10
          ${
            step >= item.number
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
                  >
                    {item.number}
                  </div>

                  {/* Label */}
                  <span className="mt-3 text-sm font-medium text-gray-600 text-center">
                    {item.label}
                  </span>

                  {/* Connector */}
                  {index !== 2 && (
                    <div className="absolute top-5 left-1/2 w-full flex items-center">
                      <div
                        className={`h-1 w-full transition-all
              ${step > item.number ? "bg-green-700" : "bg-gray-200"}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Project Details */}
            {step === 1 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    What's the title of your job?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Build a React dashboard for SaaS platform"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-gray-600 text-sm mt-2">
                    Be specific and clear so freelancers understand what you
                    need
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    What category best describes your project?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, category: cat })
                        }
                        className={`px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                          formData.category === cat
                            ? "border-green-600 bg-green-50 text-green-600"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Description & Skills */}
            {step === 2 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Tell us about your project
                  </label>
                  <textarea
                    required
                    placeholder="Describe what you need built, your goals, any specific requirements, and what success looks like..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-gray-600 text-sm mt-2">
                    The more detail you provide, the better proposals you'll
                    receive
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    What skills do you need? (Select at least 1)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                          formData.skills.includes(skill)
                            ? "border-green-600 bg-green-50 text-green-600"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mt-4">
                    Selected: {formData.skills.length} skill
                    {formData.skills.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 3 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Budget Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, budgetType: "fixed" })
                      }
                      className={`px-4 py-4 border-2 rounded-lg font-medium transition-all ${
                        formData.budgetType === "fixed"
                          ? "border-green-600 bg-green-50 text-green-600"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      Fixed Price
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, budgetType: "hourly" })
                      }
                      className={`px-4 py-4 border-2 rounded-lg font-medium transition-all ${
                        formData.budgetType === "hourly"
                          ? "border-green-600 bg-green-50 text-green-600"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      Hourly Rate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Budget (
                    {formData.budgetType === "fixed" ? "USD" : "USD/hour"})
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={
                      formData.budgetType === "fixed" ? "5000" : "75"
                    }
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Experience Level Required
                  </label>
                  <div className="space-y-2">
                    {["entry", "intermediate", "expert"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, level })}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-left font-medium transition-all ${
                          formData.level === level
                            ? "border-green-600 bg-green-50 text-green-600"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Project Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  >
                    <option value="less-than-1">Less than 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  Back
                </button>
              )}
              <div className="flex-1"></div>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    step === 1
                      ? !isStep1Complete
                      : step === 2
                        ? !isStep2Complete
                        : false
                  }
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isStep3Complete}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Posting..." : "Post Job"}
                </button>
              )}
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              💡 Tips for posting a great job
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>
                  Be specific about your project requirements and deliverables
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>
                  Include examples, mockups, or references if available
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>
                  Set a realistic budget to attract quality freelancers
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>Be clear about your timeline and project milestones</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
