import useFetch from "../use-fetch";
import Navbar from "../nav-bar";

// Optional: Reusable SVG Icons for a polished look
const Icons = {
  Mail: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Location: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
};

function Profile() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/users/me",
  );

  // Helper to get initials for the avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // ==============================
  // LOADING STATE (Skeleton UI)
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfd]">
        <Navbar />
        <div className="animate-pulse max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-48 bg-slate-200 rounded-3xl w-full mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="w-full sm:w-1/3 space-y-4">
              <div className="w-32 h-32 bg-slate-200 rounded-full -mt-20 border-4 border-white"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
            <div className="w-full sm:w-2/3 space-y-4 mt-8 sm:mt-0">
              <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
              <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR STATE
  // ==============================
  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfcfd]">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md text-center border border-red-100">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-bold mb-2">Failed to load profile</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Safe fallback if data is missing
  if (!data) return null;

  const isFreelancer = data.userrole?.toLowerCase() === "freelancer";

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        {/* ============================== */}
        {/* ============================== */}
        {/* COVER & HEADER SECTION */}
        {/* ============================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Cover Photo - Upwork Brand Green */}
          <div className="h-32 sm:h-48 w-full bg-[#059669] relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          </div>

          {/* Profile Details (White Area) */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
              {/* Avatar Box - ONLY the avatar gets pulled up */}
              <div className="-mt-16 sm:-mt-20 relative inline-block z-10 flex-shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-emerald-50 shadow-sm flex items-center justify-center text-4xl sm:text-5xl font-bold text-[#14a800] overflow-hidden">
                  {getInitials(data.name || data.username)}
                </div>
                {/* Online Status Dot */}
                <div className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#14a800] border-4 border-white rounded-full"></div>
              </div>

              {/* User Info & Actions Container - Stays in the white section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between flex-1 gap-4 mt-2 sm:mt-0 sm:pb-2">
                {/* Text Info */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-1 sm:mb-2">
                    {data.name || data.username}
                  </h1>

                  <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                    <p className="text-gray-600 font-medium text-sm sm:text-base">
                      @{data.username}
                    </p>
                    <span className="hidden sm:inline text-gray-300">•</span>

                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wide">
                      <span
                        className={`w-2 h-2 rounded-full ${isFreelancer ? "bg-blue-600" : "bg-[#14a800]"}`}
                      ></span>
                      {data.userrole || "Member"}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button className="flex-1 md:flex-none px-6 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm">
                    Share Profile
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#059669] text-white font-semibold rounded-full hover:bg-[#108a00] transition-colors text-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============================== */}
        {/* TWO COLUMN LAYOUT */}
        {/* ============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDEBAR: Personal Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">About</h2>

              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                    <Icons.Mail />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      Email
                    </p>
                    <p className="font-medium text-slate-900">{data.email}</p>
                  </div>
                </li>

                <li className="flex items-center gap-4 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                    <Icons.Location />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      Location
                    </p>
                    <p className="font-medium text-slate-900">Earth</p>{" "}
                    {/* Mocked */}
                  </div>
                </li>

                <li className="flex items-center gap-4 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                    <Icons.Calendar />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      Member Since
                    </p>
                    <p className="font-medium text-slate-900">2024</p>{" "}
                    {/* Mocked */}
                  </div>
                </li>
              </ul>
            </div>

            {/* Verification Block */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-sm border border-slate-700 p-8 text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold mb-2">Identity Verified</h3>
              <p className="text-slate-400 text-sm mb-4">
                You have successfully verified your identity with our secure
                provider.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
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
                Verified
              </div>
            </div>
          </div>

          {/* RIGHT MAIN AREA: Dynamic Content based on Role */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights/Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  label: isFreelancer ? "Total Earnings" : "Total Spent",
                  value: "$0.00",
                },
                {
                  label: isFreelancer ? "Jobs Completed" : "Jobs Posted",
                  value: "0",
                },
                { label: "Hours Worked", value: "0 hrs" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-slate-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Placeholder for bio/description */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {isFreelancer
                    ? "Professional Overview"
                    : "Company Description"}
                </h2>
                <button className="text-emerald-600 hover:text-emerald-700 bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Welcome to your profile! Add a description here to tell{" "}
                {isFreelancer
                  ? "clients about your skills, experience, and what makes you unique"
                  : "freelancers about your business and the kinds of projects you hire for"}
                . A complete profile helps you build trust and stand out on the
                platform.
              </p>
            </div>

            {/* Placeholder for portfolio/history */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {isFreelancer ? "Work History & Portfolio" : "Active Jobs"}
              </h2>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold mb-1">
                  No items to display yet
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  {isFreelancer
                    ? "Complete your first job or add portfolio items to show off your expertise."
                    : "Post a job to start finding top talent from around the world."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
