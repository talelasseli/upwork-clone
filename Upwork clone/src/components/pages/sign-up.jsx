import { useState } from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState(null);

  // Role Selection Screen
  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 12c0-3.315 2.685-6 6-6s6 2.685 6 6-2.685 6-6 6-6-2.685-6-6zm10-8H8c-4.418 0-8 3.582-8 8s3.582 8 8 8h8c4.418 0 8-3.582 8-8s-3.582-8-8-8z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-900">Upwork</span>
              </Link>
              <Link
                to="/sign-in"
                className="text-gray-700 text-sm font-medium hover:text-gray-900"
              >
                Already have an account?{" "}
                <span className="text-green-600">Log In</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join the freelance revolution
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're looking to hire talented professionals or showcase
              your skills, Upwork connects you with opportunities that matter.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Client Card */}
            <button
              onClick={() => setRole("client")}
              className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-green-600 hover:shadow-lg transition-all duration-300 text-left group"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors mb-4">
                  <svg
                    className="w-6 h-6 text-green-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I'm a client
              </h3>
              <p className="text-gray-600 mb-6">
                Hire top talent to complete your projects and grow your business
              </p>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-green-600 font-medium text-sm">
                  Continue as Client →
                </span>
              </div>
            </button>

            {/* Freelancer Card */}
            <button
              onClick={() => setRole("freelancer")}
              className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-green-600 hover:shadow-lg transition-all duration-300 text-left group"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I'm a freelancer
              </h3>
              <p className="text-gray-600 mb-6">
                Find exciting projects, build your portfolio, and earn money on
                your terms
              </p>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-green-600 font-medium text-sm">
                  Continue as Freelancer →
                </span>
              </div>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-sm mb-6">
              Trusted by millions of professionals worldwide
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  5+ Million freelancers
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">$1B+ spent annually</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">180+ countries</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Sign Up Form Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 12c0-3.315 2.685-6 6-6s6 2.685 6 6-2.685 6-6 6-6-2.685-6-6zm10-8H8c-4.418 0-8 3.582-8 8s3.582 8 8 8h8c4.418 0 8-3.582 8-8s-3.582-8-8-8z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">Upwork</span>
            </Link>
            <button
              onClick={() => setRole(null)}
              className="text-gray-700 font-medium text-sm hover:text-gray-900 flex items-center gap-2"
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
          </div>
        </div>
      </header>

      {/* Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600">
              Signing up as a{" "}
              <span className="font-semibold text-gray-900 capitalize">
                {role}
              </span>
            </p>
          </div>

          <SignUp
            unsafeMetadata={{ userrole: role }}
            afterSignUpUrl="/sync-logic"
            appearance={{
              elements: {
                footerAction: { display: "none" },
              },
            }}
          />
        </div>
      </main>
    </div>
  );
}
