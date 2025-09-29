import React from "react";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl">
      <form className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="text"
            id="name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="email"
            id="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="password"
            id="password"
            required
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Sign Up
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
