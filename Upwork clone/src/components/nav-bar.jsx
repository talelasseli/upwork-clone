import { ClientOnly, FreelancerOnly } from "./role-views";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  // Reusable class for center navigation links to keep the code clean
  const navLinkClass =
    "text-slate-600 text-sm font-semibold hover:text-emerald-600 hover:bg-emerald-50/80 px-4 py-2 rounded-full transition-all duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Increased height to h-20 for a more breathable, premium feel */}
        <div className="flex justify-between items-center h-20 gap-8">
          {/* Logo - Upgraded with Gradients and Scale effects */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 12c0-3.315 2.685-6 6-6s6 2.685 6 6-2.685 6-6 6-6-2.685-6-6zm10-8H8c-4.418 0-8 3.582-8 8s3.582 8 8 8h8c4.418 0 8-3.582 8-8s-3.582-8-8-8z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              Upwork
            </span>
          </Link>

          {/* Center Navigation - Signed In Only */}
          <SignedIn>
            <div className="hidden lg:flex items-center gap-1 flex-1 ml-8">
              <Link to="/" className={navLinkClass}>
                Home
              </Link>

              <ClientOnly>
                <Link to="/post-job" className={navLinkClass}>
                  Post a Job
                </Link>
                <Link to="/my-jobs" className={navLinkClass}>
                  My Jobs
                </Link>
              </ClientOnly>

              <FreelancerOnly>
                <Link to="/jobs" className={navLinkClass}>
                  Find Work
                </Link>
                <Link to="/my-proposals" className={navLinkClass}>
                  My Proposals
                </Link>
              </FreelancerOnly>

              <Link to="/my-contracts" className={navLinkClass}>
                Contracts
              </Link>
            </div>
          </SignedIn>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-auto">
            <SignedIn>
              <Link
                to="/profile"
                className="text-slate-600 text-sm font-semibold hover:text-emerald-600 transition-colors hidden md:block mr-2"
              >
                Profile
              </Link>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 bg-white">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9", // Ensures the Clerk avatar perfectly fits the container
                    },
                  }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-2">
                <Link
                  to="/sign-in"
                  className="px-5 py-2.5 text-slate-700 text-sm font-bold hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5"
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
