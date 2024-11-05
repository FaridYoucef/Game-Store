import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; 
import getCookie from "../../getCookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constant";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const csrfToken = getCookie("csrftoken"); // Get the CSRF token
    console.log("Logging in user with data:", { username, password });

    try {
      const res = await api.post(
        "/token/",
        { username, password },
        {
          headers: {
            "X-CSRFToken": csrfToken, // Include CSRF token in headers
          },
        }
      );

      // Store tokens in local storage
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      // Redirect to homepage after successful login
      navigate("/user/profile/update/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded shadow-md mb-8 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>} {/* Display error messages */}
    </div>
  );
}

export default Login;
