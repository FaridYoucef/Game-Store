import React from "react";

function Login() {
  return (
    <div className="max-w-md w-full bg-white p-8 rounded shadow-md mb-8 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Already Registered?</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
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
          />
        </div>
        <button
          type="submit"
          className="w-full bg-fuchsia-700 text-white p-2 rounded mt-4"
        >
          Sign In
        </button>
      </form>
        <p className="text-red-500 mt-4"></p>
    </div>
  );
}

export default Login;
