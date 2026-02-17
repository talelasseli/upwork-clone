import useFetch from "../use-fetch";

function Profile() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/users/me",
  );

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;
  console.log("Profile data:", data);
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Username: {data.username}</p>
      <p>Role: {data.userrole}</p>
    </div>
  );
}
export default Profile;
