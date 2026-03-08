import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
function RoleSelection() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Store selected role in Clerk metadata
    console.log(event.target.role.value); // Log the selected role
    await getToken(); // Get the secure token from Clerk
    try {
      const token = await getToken(); // Get the secure token from Clerk
      const response = await fetch(
        "http://localhost:3000/api/users/update-role",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token to backend
          },
          body: JSON.stringify({
            userrole: event.target.role.value, // Send selected role to backend
          }),
        },
      );

      if (response.ok) {
        await user.reload(); // Refresh user data to get updated metadata
        alert("Role updated successfully!");
        navigate("/"); // Redirect to home or any other page
      } else {
        alert("Failed to set role");
      }
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <div>
      <h1>Complete setup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="role">please select your role:</label>
        <select id="role" name="role">
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RoleSelection;
