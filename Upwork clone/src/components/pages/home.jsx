import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FreelancerOnly, ClientOnly } from "../role-views";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../nav-bar";

// Lightweight custom animations injected directly
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .animate-fade-in-up {
      opacity: 0;
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
  `}</style>
);

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
      <AnimationStyles />
      <Navbar />
      <main className="bg-[#f9fafb] min-h-screen font-sans overflow-hidden">
        <SignedIn>
          {/* ========================================== */}
          {/* FREELANCER DASHBOARD */}
          {/* ========================================== */}
          <FreelancerOnly>
            <div className="bg-white min-h-screen">
              {/* Hero Section */}
              <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="animate-fade-in-up z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-semibold text-sm mb-6">
                      Welcome to your workspace ✨
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                      Build your <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                        freelance career
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                      Find projects that match your skills, work on your terms,
                      and grow your business on the world's most trusted work
                      marketplace.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/jobs"
                        className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:-translate-y-1 text-center"
                      >
                        Browse Opportunities
                      </Link>
                      <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 text-center">
                        Update Profile
                      </button>
                    </div>
                  </div>
                  <div className="relative animate-fade-in-up delay-200 lg:h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-105"></div>
                    <div className="relative h-full w-full bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[3rem] shadow-2xl overflow-hidden animate-float">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                      <div className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                            💼
                          </div>
                          <div>
                            <p className="font-bold text-lg">Top Rated</p>
                            <p className="text-emerald-100 text-sm">
                              You're in the top 5%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="border-y border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 divide-x divide-slate-200">
                    <div className="text-center animate-fade-in-up delay-100">
                      <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
                        5M+
                      </div>
                      <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">
                        Active Freelancers
                      </p>
                    </div>
                    <div className="text-center animate-fade-in-up delay-200">
                      <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
                        $1B+
                      </div>
                      <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">
                        Spent Annually
                      </p>
                    </div>
                    <div className="text-center animate-fade-in-up delay-300 col-span-2 md:col-span-1 border-t md:border-t-0 pt-8 md:pt-0 border-slate-200">
                      <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
                        180+
                      </div>
                      <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">
                        Countries
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Jobs Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex justify-between items-end mb-12 animate-fade-in-up">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                      Featured Opportunities
                    </h2>
                    <p className="text-slate-500 text-lg">
                      Handpicked projects looking for your exact skills.
                    </p>
                  </div>
                  <Link
                    to="/jobs"
                    className="hidden sm:block text-emerald-600 font-semibold hover:text-emerald-700 hover:underline underline-offset-4"
                  >
                    View all jobs →
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item, index) => (
                    <div
                      key={item}
                      className={`animate-fade-in-up delay-${(index + 1) * 100} bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200 transition-all duration-300 group cursor-pointer`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            Senior Full-Stack Developer Needed
                          </h3>
                          <p className="text-emerald-600 font-semibold mt-2">
                            Fixed-price • $2,500 - $5,000
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                          Featured
                        </span>
                      </div>
                      <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2">
                        Looking for an experienced developer to build a
                        responsive, modern web application using React, Node.js,
                        and TailwindCSS...
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {["React", "Node.js", "Tailwind", "TypeScript"].map(
                          (tag) => (
                            <span
                              key={tag}
                              className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <span className="text-slate-400 text-sm font-medium">
                          Posted 2 hours ago
                        </span>
                        <button className="bg-slate-50 text-slate-900 px-5 py-2 rounded-full font-semibold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </FreelancerOnly>

          {/* ========================================== */}
          {/* CLIENT DASHBOARD */}
          {/* ========================================== */}
          <ClientOnly>
            <div className="bg-white min-h-screen">
              {/* Hero Section */}
              <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="animate-fade-in-up z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm mb-6">
                      For Businesses & Enterprise 🚀
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                      Get projects done <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        faster & better
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                      Access a global network of top-tier talent, manage your
                      projects effortlessly, and scale your business securely.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/post-job"
                        className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:-translate-y-1 text-center"
                      >
                        Post a Job — It's Free
                      </Link>
                      <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-center">
                        Explore Talent
                      </button>
                    </div>
                  </div>
                  <div className="relative animate-fade-in-up delay-200 lg:h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[3rem] transform -rotate-3 scale-105"></div>
                    <div className="relative h-full w-full bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] shadow-2xl overflow-hidden animate-float">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                      <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-white max-w-[200px]">
                        <div className="text-3xl mb-2">🤝</div>
                        <p className="font-bold">98% Success</p>
                        <p className="text-blue-100 text-sm mt-1">
                          On projects matched by our AI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Upwork Section */}
              <section className="bg-slate-50 py-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                      Why businesses turn to us
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Find the right freelancer, manage projects, and pay
                      securely with our streamlined, all-in-one platform.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Vetted Talent",
                        desc: "Access a global network of pre-screened and highly-rated professionals.",
                        icon: "🌟",
                      },
                      {
                        title: "Project Management",
                        desc: "Built-in, intuitive tools to manage timelines, budgets, and communication.",
                        icon: "📊",
                      },
                      {
                        title: "Secure Payments",
                        desc: "Your money is held securely. Only pay when you're 100% satisfied with the work.",
                        icon: "🔒",
                      },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className={`animate-fade-in-up delay-${(idx + 1) * 100} bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
                      >
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-blue-100">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </ClientOnly>
        </SignedIn>

        <SignedOut>
          {/* ========================================== */}
          {/* PUBLIC LANDING PAGE */}
          {/* ========================================== */}
          <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 text-center">
                <div className="animate-fade-in-up max-w-4xl mx-auto">
                  <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.05]">
                    How work <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700">
                      should work
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                    Forget the old rules. You can have the best people. Right
                    now. Right here. The world's largest work marketplace.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      to="/sign-up"
                      className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white text-lg font-bold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-xl shadow-emerald-600/20 hover:-translate-y-1"
                    >
                      Get Started
                    </Link>
                    <button className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 text-lg font-bold rounded-full hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300">
                      Take a Tour
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-900 text-white py-24 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                      Up your work game, it’s free.
                    </h2>
                    <ul className="space-y-6 mb-10">
                      {[
                        "No cost to join",
                        "Post a job and hire top talent",
                        "Work with the best—without breaking the bank",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 text-lg text-slate-300"
                        >
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/sign-up"
                      className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors"
                    >
                      Sign up for free
                    </Link>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 animate-fade-in-up delay-200">
                    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-8 hover:bg-slate-800 transition-colors cursor-pointer group">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                        I'm a Client
                      </h3>
                      <p className="text-slate-400 mb-8">
                        Find, hire, and manage top professionals for your
                        projects.
                      </p>
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                        →
                      </div>
                    </div>
                    <div className="bg-emerald-600 rounded-3xl p-8 hover:bg-emerald-500 transition-colors cursor-pointer group mt-0 sm:mt-8">
                      <h3 className="text-2xl font-bold mb-4">
                        I'm a Freelancer
                      </h3>
                      <p className="text-emerald-100 mb-8">
                        Find work, earn money, and grow your independent career.
                      </p>
                      <div className="w-12 h-12 rounded-full bg-emerald-700 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SignedOut>
      </main>
    </>
  );
}

export default Home;
