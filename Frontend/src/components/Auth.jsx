import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/user/login" : "/user/signup";
      const { data } = await axios.post(url, formData, {
        withCredentials: true,
      });
      setMessage(data.message);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-[28vw]">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#027af2]  outline-none"
              placeholder="Enter your name"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#027af2]  outline-none"
                placeholder="your@email.com"
              />
            </div>
          )}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#027af2] outline-none"
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#027af2] hover:bg-[#4ca6ff] transition font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={handleGoogleAuth}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-[#1a6abb] hover:bg-blue-500 transition font-semibold"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        <div className="text-center mt-4">
          <button
            className="text-white hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setError("");
              setFormData({ username: "", email: "", password: "" });
            }}
          >
            {isLogin ? "Create an account" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
