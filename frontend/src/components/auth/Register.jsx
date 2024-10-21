import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Axios instance from your setup
import getCookie from "../../getCookie";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For displaying errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); // Start loading state
  
    const csrfToken = getCookie("csrftoken");
    console.log("Registering user with data:", { username, email, password });
  
    try {
      const res = await api.post(
        "/user/register/",
        { username, email, password },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
  
      // If registration is successful, navigate to the login page
      navigate("/user/login");
  
    } catch (error) {
      // Handle registration error
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Registration error:", error.response.data);
        alert(`Registration failed: ${error.response.data.detail || 'Unknown error'}`);
      } else {
        // The request was made but no response was received
        console.error("Error without response:", error);
        alert("Registration failed: No response from server.");
      }
    } finally {
      setLoading(false); // End loading state
    }
  };
  

  return (
    <div className="max-w-md w-full bg-white p-8 rounded shadow-md mb-8 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border border-gray-300 rounded"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-fuchsia-700 text-white p-2 rounded mt-4"
          disabled={loading} 
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}{" "}
     
    </div>
  );
}

export default Register;
