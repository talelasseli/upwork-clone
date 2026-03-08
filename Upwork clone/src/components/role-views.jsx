import { useUser } from "@clerk/clerk-react";

// Only shows content to Clients
export function ClientOnly({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  const role = user?.publicMetadata?.userrole;

  if (!role) return null; // If no role is set, show nothing
  return role === "client" ? children : null;
}

// Only shows content to Freelancers
export function FreelancerOnly({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  const role = user?.publicMetadata?.userrole;

  return role === "freelancer" ? children : null;
}
