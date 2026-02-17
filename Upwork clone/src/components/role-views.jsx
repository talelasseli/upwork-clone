import { useUser } from "@clerk/clerk-react";

// Only shows content to Clients
export function ClientOnly({ children }) {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return null;
  const role = user?.unsafeMetadata?.userrole;

  return role === "client" ? children : null;
}

// Only shows content to Freelancers
export function FreelancerOnly({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  const role = user?.unsafeMetadata?.userrole;

  return role === "freelancer" ? children : null;
}