import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        alert("Sign Up SuccessFull");
        setForm({
          name: "",
          email: "",
          password: "",
        });
        navigate("/signin");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
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
