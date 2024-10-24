import React from "react";

const UserProfileForm = () => {

  return (
    <form className="max-w-md mx-auto p-4 shadow-md rounded mt-4">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Username:</label>
        <input
          type="text"
          name="username"        
          className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email:</label>
        <input
          type="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Profile Image:</label>

          <img
            src=''
            alt="Profile Preview"
            className="w-20 h-20 rounded-full mb-2"
          />
        <input
          type="file"
          name="profile_image"
          accept="image/*"
          className="mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Address:</label>
        <input
          type="text"
          name="address"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Date of Birth:</label>
        <input
          type="date"
          name="date_of_birth"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>
    </form>
  );
};

export default UserProfileForm;
