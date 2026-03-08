import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FreelancerOnly, ClientOnly } from "../role-views";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const { user, isLoaded } = useUser();
  if (user && isLoaded) {
    const role = user?.publicMetadata?.userrole;
    if (!role) {
      return <Navigate to="/setup" />;
    }
  }
  return (
    <header>
      <main>
        <SignedIn>
          <h2>Welcome to Upwork!</h2>
          <p>Your one-stop platform for freelance work.</p>
          <FreelancerOnly>
            <Link to="/jobs">Explore Jobs</Link>
          </FreelancerOnly>
        </SignedIn>
        <SignedOut>
          <h2>Welcome to Upwork!</h2>
          <p>Please sign in to access your dashboard and find work.</p>
        </SignedOut>
      </main>
    </header>
  );
}

export default Home;
