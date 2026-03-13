import useFetch from "./use-fetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./nav-bar";

function Jobs() {
  const { data, loading, error } = useFetch("http://localhost:3000/api/jobs");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Data Science",
    "DevOps",
  ];

  const filteredJobs =
    data?.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Work</h1>
            <p className="text-lg text-gray-600">
              Explore thousands of projects and find the perfect fit for your
              skills
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search jobs by title, skill, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Filter by category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-green-600"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Loading available jobs...
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
                  <h3 className="font-bold text-red-900">Error loading jobs</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* No Results State */}
          {!loading && !error && filteredJobs.length === 0 && (
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
                No jobs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search filters to find more opportunities
              </p>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && !error && filteredJobs.length > 0 && (
            <>
              <div className="mb-6 text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {filteredJobs.length}
                </span>{" "}
                job{filteredJobs.length !== 1 ? "s" : ""}
              </div>
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.jobID}
                    onClick={() => handleJobClick(job.jobID)}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors mb-2">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {job.category || "Featured"}
                        </span>
                      </div>
                    </div>

                    {/* Job Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Budget
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${job.budget}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Level
                        </p>
                        <p className="text-gray-900 font-semibold">
                          Intermediate
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Timeline
                        </p>
                        <p className="text-gray-900 font-semibold">
                          1-3 months
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          Posted
                        </p>
                        <p className="text-gray-900 font-semibold">Today</p>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["React", "Node.js", "MongoDB"].map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-green-600 font-semibold text-sm hover:text-green-700">
                        View Details →
                      </p>
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

export default Jobs;
