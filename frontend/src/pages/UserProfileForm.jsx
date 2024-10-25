import React, { useState, useEffect } from "react";
import api from "../api"; 

const UserProfileForm = () => {
  const [profileData, setProfileData] = useState({
    profile_image: null,
    address: "",
    phone_number: "",
    date_of_birth: "",
    user: {
      username: "",
      email: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token"); 

         // Make the API request to get the current user's profile data
        const response = await api.get("/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data);

         // If there's an existing profile image, set it in the image preview state
        if (response.data.profile_image) {
          setProfileImagePreview(response.data.profile_image);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Handle file input and update for profile image
      setProfileData({ ...profileData, [name]: files[0] });
      setProfileImagePreview(URL.createObjectURL(files[0]));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append fields to the FormData object
    if (profileData.profile_image) {
      formData.append("profile_image", profileData.profile_image);
    }
    formData.append("address", profileData.address);
    formData.append("phone_number", profileData.phone_number);
    formData.append("date_of_birth", profileData.date_of_birth);

    try {
      const token = localStorage.getItem("token");

      // Send a PUT request to update the user profile using the FormData object
      await api.put("/user/profile/update/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Display success message on successful update
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Render the form for updating the profile
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
      {/* Profile Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_image">
          Profile Image
        </label>
        <input
          type="file"
          id="profile_image"
          name="profile_image"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
        />
        {profileImagePreview && (
          <div className="mt-2">
            <img
              src={profileImagePreview}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Address Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          placeholder="Enter your address"
        />
      </div>

      {/* Phone Number Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
          Phone Number
        </label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={profileData.phone_number}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Date of Birth Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_of_birth">
          Date of Birth
        </label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={profileData.date_of_birth || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Username (Read-Only) */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={profileData.user.username}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Email (Read-Only) */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={profileData.user.email}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
