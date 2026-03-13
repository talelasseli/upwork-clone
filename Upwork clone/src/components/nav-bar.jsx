import { ClientOnly, FreelancerOnly } from "./role-views";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-12">
          {/* Logo - Upwork Style */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
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

          {/* Center Navigation - Signed In Only */}
          <SignedIn>
            <div className="hidden lg:flex items-center gap-6 flex-1">
              <Link
                to="/"
                className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors"
              >
                Home
              </Link>

              <ClientOnly>
                <Link
                  to="/post-job"
                  className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors"
                >
                  Post a Job
                </Link>
                <Link
                  to="/my-jobs"
                  className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors"
                >
                  My Jobs
                </Link>
              </ClientOnly>

              <FreelancerOnly>
                <Link
                  to="/jobs"
                  className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors"
                >
                  Find Jobs
                </Link>
                <Link
                  to="/my-proposals"
                  className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors"
                >
                  My Proposals
                </Link>
              </FreelancerOnly>

              <Link
                to="/my-contracts"
                className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors"
              >
                Contracts
              </Link>
            </div>
          </SignedIn>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-auto">
            <SignedIn>
              <Link
                to="/profile"
                className="text-gray-700 text-sm font-normal hover:text-gray-900 transition-colors hidden md:block"
              >
                Profile
              </Link>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-3">
                <Link
                  to="/sign-in"
                  className="px-4 py-2 text-gray-900 text-sm font-medium hover:bg-gray-50 rounded transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
