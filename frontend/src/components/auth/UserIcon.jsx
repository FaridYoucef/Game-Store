import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";

const UserIcon = () => {
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const dropDownRef = useRef(null);

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
          setUserData(response.data);
        } else {
          navigate("/user/login"); 
        }
      } catch (error) {
        setError("Failed to fetch user data."); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle Logout
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await api.post("/user/logout/");
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/user/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    // Render Login as a button if no user data to prevent nested <a> tag issues
    return (
      <button onClick={() => navigate("/user/login")} className="text-blue-600 hover:underline">
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 text-gray-800"
      >
        {userData.profile_image ? (
          <img
            src={userData.profile_image}
            alt="User Icon"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {userData.user?.username ? userData.user.username[0].toUpperCase() : "U"}
          </div>
        )}
        <span>{userData.user?.username || "User"}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
