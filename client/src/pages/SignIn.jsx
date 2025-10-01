import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { signin } = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form Submitted")
    try {
      const res = await axios.post("/api/auth/signin", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const { user, token } = res.data;
        signin(user, token);
        alert("Sign In Successfully");
        setForm({ email: "", password: "" });
        navigate("/");
        console.log(res.data);
      }
    } catch (error) {
      console.log("Something went Wrong", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
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
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Sign In
        </button>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
