import { useAuth } from "@clerk/clerk-react";
import useFetch from "../use-fetch";
function Contracts() {
  const { getToken } = useAuth();
  const { userId } = useAuth();

  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/contracts/my-contracts`,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAccept = async (id) => {
    console.log("Accepting contract ID:", id);

    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:3000/api/contracts/${id}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert("Contract accepted successfully!");
      } else {
        alert(data.error || "Failed to accept contract");
      }
    } catch (err) {
      console.error("Request failed", err);
      alert("Failed to accept contract");
    }
  };

  return (
    <div>
      <h1>Contracts</h1>
      {data &&
        data.map((contract) => (
          <div key={contract.contractID}>
            <h2>{contract.title}</h2>
            <p>Client: {contract.client_id}</p>
            <p>Freelancer: {contract.freelancer_id}</p>
            <p>Status: {contract.status}</p>
            {userId === contract.freelancer_id &&
              contract.status === "pending" && (
                <button onClick={() => handleAccept(contract.id)}>
                  Accept
                </button>
              )}
          </div>
        ))}
    </div>
  );
}

export default Contracts;
