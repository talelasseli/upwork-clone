import { useState } from "react";
import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  const [role, setRole] = useState(null); // null, 'client', or 'freelancer'

  // 1. If no role is selected, show the selection buttons
  if (!role) {
    return (
      <div className="role-selection">
        <h1>Join as a client or freelancer</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <div className="card" onClick={() => setRole("client")}>
            <h3>I'm a client, hiring for a project</h3>
          </div>
          <div className="card" onClick={() => setRole("freelancer")}>
            <h3>I'm a freelancer, looking for work</h3>
          </div>
        </div>
        <div style={{ marginTop: "20px", fontStyle: "italic" }}>
          Already have an account? <a href="/sign-in">Sign in here</a>
        </div>
      </div>
    );
  }

  // 2. Once role is selected, show the Clerk SignUp component
  // We pass the role into 'unsafeMetadata' so it's saved in Clerk automatically
  return (
    <div>
      <button onClick={() => setRole(null)}>← Back to role selection</button>
      <h2>Creating account as: {role}</h2>
      
      <SignUp 
        unsafeMetadata={{ userrole: role }} 
        afterSignUpUrl="/sync-logic" 
      />
    </div>
  );
}