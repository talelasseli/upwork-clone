import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import SyncLogic from "./components/pages/sync-logic";
import Signup from "./components/pages/sign-up";
import Signin from "./components/pages/sign-in";
import Navbar from "./components/nav-bar";
import Jobs from "./components/jobs";
import Profile from "./components/pages/profile";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
