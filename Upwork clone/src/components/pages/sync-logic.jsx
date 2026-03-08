import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SyncLogic() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const sync = async () => {
      const token = await getToken();

      // Pull the role out of the metadata we set in Step 1
      const roleFromMetadata = user.unsafeMetadata.userrole;
      console.log("Role from metadata:", roleFromMetadata);

      await fetch("http://localhost:3000/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
          username: user.username || user.firstName,
          userrole: roleFromMetadata, // Sent to MySQL
        }),
      });

      navigate("/"); // Send them home after sync
    };

    if (user) sync();
  }, [user]);

  return <p>Finalizing your account...</p>;
}
