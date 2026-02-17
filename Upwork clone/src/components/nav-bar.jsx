import { ClientOnly, FreelancerOnly } from "./role-views";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav-bar">
      <UserButton afterSignOutUrl="/" />
      <h1>Upwork</h1>
      <SignedIn>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <ClientOnly>
              <li>
                <a href="/post-job">Post a Job</a>
              </li>
            </ClientOnly>
            <FreelancerOnly>
              <li>
                <Link to="/jobs">Find Jobs</Link>
              </li>
            </FreelancerOnly>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </ul>
        </nav>
      </SignedIn>
      <SignedOut>
        <div className="signed-out-nav">
          <Link to="/sign-up">Sign Up</Link>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </SignedOut>
    </div>
  );
}

export default Navbar;
