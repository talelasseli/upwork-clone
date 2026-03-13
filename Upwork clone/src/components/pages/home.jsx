import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FreelancerOnly, ClientOnly } from "../role-views";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../nav-bar";

function Home() {
  const { user, isLoaded } = useUser();
  if (user && isLoaded) {
    const role = user?.publicMetadata?.userrole;
    if (!role) {
      return <Navigate to="/setup" />;
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <SignedIn>
          {/* Freelancer Dashboard */}
          <FreelancerOnly>
            <div className="bg-gradient-to-br from-green-50 to-white min-h-screen">
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                      Build your freelance career
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      Find projects that match your skills, work on your terms,
                      and grow your business on the world's largest freelance
                      platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/jobs"
                        className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md text-center"
                      >
                        Browse Jobs
                      </Link>
                      <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition-colors text-center">
                        How It Works
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl h-80 md:h-96 shadow-2xl opacity-90"></div>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        5M+
                      </div>
                      <p className="text-gray-600">Active Freelancers</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        $1B+
                      </div>
                      <p className="text-gray-600">Spent Annually</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        180+
                      </div>
                      <p className="text-gray-600">Countries</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Jobs Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Featured Opportunities
                </h2>
                <p className="text-gray-600 text-lg mb-12">
                  Handpicked projects looking for talented freelancers like you
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Web Development Project
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            Budget: $2,500 - $5,000
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Building a responsive e-commerce platform with React and
                        Node.js. Looking for experienced developers...
                      </p>
                      <div className="flex gap-2 mb-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          React
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          Node.js
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">
                          Posted 2 hours ago
                        </span>
                        <button className="text-green-600 font-semibold hover:text-green-700">
                          View More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to get started?
                  </h2>
                  <p className="text-lg text-green-100 mb-8">
                    Join millions of freelancers earning on their own terms
                  </p>
                  <Link
                    to="/jobs"
                    className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Start Exploring Jobs
                  </Link>
                </div>
              </section>
            </div>
          </FreelancerOnly>

          {/* Client Dashboard */}
          <ClientOnly>
            <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                      Get projects done faster
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      Access global talent, manage projects effortlessly, and
                      scale your business with vetted freelancers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/post-job"
                        className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md text-center"
                      >
                        Post Your First Job
                      </Link>
                      <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition-colors text-center">
                        Explore Talent
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl h-80 md:h-96 shadow-2xl opacity-90"></div>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        7M+
                      </div>
                      <p className="text-gray-600">Projects Posted</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        $1B+
                      </div>
                      <p className="text-gray-600">Spent on Platform</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        98%
                      </div>
                      <p className="text-gray-600">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Upwork Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Why choose Upwork?
                </h2>
                <p className="text-gray-600 text-lg mb-12 max-w-2xl">
                  Find the right freelancer, manage projects, and pay securely
                  with Upwork's streamlined platform
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Vetted Talent",
                      description:
                        "Access a global network of pre-screened and verified freelancers",
                    },
                    {
                      title: "Project Management",
                      description:
                        "Built-in tools to manage timelines, budgets, and communication",
                    },
                    {
                      title: "Secure Payments",
                      description:
                        "Only pay when work is completed to your satisfaction",
                    },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to find your next team?
                  </h2>
                  <p className="text-lg text-green-100 mb-8">
                    Post a job and connect with talented freelancers in minutes
                  </p>
                  <Link
                    to="/post-job"
                    className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Post a Job Now
                  </Link>
                </div>
              </section>
            </div>
          </ClientOnly>
        </SignedIn>

        <SignedOut>
          {/* Public Landing Page */}
          <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  The world's work marketplace
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  Connect with businesses and freelancers. Post jobs, find
                  talent, and get work done. All on Upwork.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/sign-up"
                    className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
                  >
                    Sign Up Now
                  </Link>
                  <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How Upwork Works
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    For Freelancers
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Browse thousands of projects from businesses worldwide,
                    submit proposals, and earn money.
                  </p>
                  <Link
                    to="/sign-up"
                    className="text-green-600 font-semibold hover:text-green-700"
                  >
                    Start as a Freelancer →
                  </Link>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    For Businesses
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Post jobs, find vetted talent, manage projects, and pay
                    securely all in one place.
                  </p>
                  <Link
                    to="/sign-up"
                    className="text-green-600 font-semibold hover:text-green-700"
                  >
                    Start as a Business →
                  </Link>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      5M+
                    </div>
                    <p className="text-gray-600">Freelancers</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      $1B+
                    </div>
                    <p className="text-gray-600">Spent Annually</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      180+
                    </div>
                    <p className="text-gray-600">Countries</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
              <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4">
                  Join the Upwork Community
                </h2>
                <p className="text-lg text-green-100 mb-8">
                  Start connecting with businesses and opportunities today
                </p>
                <Link
                  to="/sign-up"
                  className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Get Started for Free
                </Link>
              </div>
            </section>
          </div>
        </SignedOut>
      </main>
    </>
  );
}

export default Home;
