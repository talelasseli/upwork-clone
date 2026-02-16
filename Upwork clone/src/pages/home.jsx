import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Home() {
  return (
    <header>
      <SignedOut>
        <Navigate to="/sign-up" />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <p>Welcome to the app!</p>
      </SignedIn>
    </header>
  );
}

export default Home;
