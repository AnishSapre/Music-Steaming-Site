import React from "react";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { url } from "../../../SpotifyAdmin/src/App";
import { toast } from "react-toastify"; // Ensure you have this installed
import { assets } from "../assets/assets"; // Adjust according to your assets path
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/add`, {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Login Successful");
        setEmail("");
        setPassword("");
        navigate("/"); // Navigate to home page on success
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error Occurred!");
    }
    setLoading(false);
  };

  return (
    <div
      className="h-screen bg-gray-400 flex justify-center items-center bg-cover bg-center"
    >
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-8">
          Create an Account
        </h2>

        {/* Social Login Options */}
        <div className="space-y-4">
          <button className="w-full border border-gray-300 rounded-3xl flex justify-center items-center py-2 text-black">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <button className="w-full border border-gray-300 rounded-3xl flex justify-center items-center py-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with Facebook
          </button>

          <button className="w-full border border-gray-300 rounded-3xl flex justify-center items-center py-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732251.png"
              alt="Apple"
              className="w-5 h-5 mr-2"
            />
            Continue with Apple
          </button>
        </div>

        <div className="my-6 flex justify-center items-center">
          <span className="text-gray-400">OR</span>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email address or user name"
              className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="mb-4 relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <span className="absolute right-3 top-2 cursor-pointer text-gray-400">
              Hide
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-red-400 text-white py-2 rounded-3xl hover:bg-red-500 transition"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full border border-gray-300 rounded-3xl py-2 mt-2"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
