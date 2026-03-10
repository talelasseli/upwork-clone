import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import SyncLogic from "./components/pages/sync-logic";
import Signup from "./components/pages/sign-up";
import Signin from "./components/pages/sign-in";
import Navbar from "./components/nav-bar";
import Jobs from "./components/jobs";
import Profile from "./components/pages/profile";
import PostJob from "./components/pages/post-job";
import JobDetails from "./components/pages/job-details";
import MyJobs from "./components/pages/my-jobs";
import Proposals from "./components/pages/my-proposals";
import RoleSelection from "./components/pages/setup";
import Contract from "./components/pages/contract";
import Contracts from "./components/pages/contracts";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sync-logic" element={<SyncLogic />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs/:jobID" element={<JobDetails />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/my-proposals" element={<Proposals />} />
        <Route path="/setup" element={<RoleSelection />} />
        <Route path="/contract/:proposalId" element={<Contract />} />
        <Route path="/my-contracts" element={<Contracts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
