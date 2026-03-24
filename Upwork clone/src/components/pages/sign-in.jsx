import { SignIn } from "@clerk/clerk-react";
import Navbar from "../nav-bar";
function Signin() {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6  rounded-lg  ">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default Signin;
