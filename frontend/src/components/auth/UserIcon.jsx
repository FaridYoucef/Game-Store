import React, { useEffect, useState } from "react";
import api from "../../api"; 

const UserIcon = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/user/profile/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("User Profile Response:", response.data); 
          setUserData(response.data); // Update userData with the response
        }
      } catch (error) {
        console.error("Error fetching user data:", error); 
        setError("Failed to fetch user data."); 
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchUserData();
  }, []);

  // Render loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>{error}</p>; // Display error message
  }

  // Render nothing if userData is null
  if (!userData) {
    return <p>No user data available.</p>;
  }

  // Render user data
  return (
    <div className="flex items-center gap-2">
      {userData.profile_image && (
        <img
          src={userData.profile_image}
          alt="User Icon"
          className="w-10 h-10 rounded-full"
        />
      )}
      <p className="text-sm font-bold">{userData.user.username || "User"}</p> 
    </div>
  );
};

export default UserIcon;
