import { SignIn } from "@clerk/clerk-react";
import Navbar from "../nav-bar";
function Signin() {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Sign In to Your Account
        </h2>
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default Signin;
