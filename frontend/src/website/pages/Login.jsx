import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, X } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        const actualUser = data.data || data;
        login(actualUser);

        if (actualUser.email?.endsWith("@admin.org")) {
          window.location.href = "http://localhost:3000/admin";
        } else {
          navigate("/");
        }
      } else {
        alert(data.error || "Login failed");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful");

        // FIX: handle both cases
        const actualUser = data.data || data;

        if (actualUser.email?.endsWith("@admin.org")) {
          window.location.href = "http://localhost:3000/admin";
        } else {
          navigate("/");
        }
      } else {
        alert(data.error || "Login failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">

      {/* Background Depth Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-300/20 rounded-full blur-[120px]" />

      {/* Blurred Overlay Backdrop */}
      <div className="absolute inset-0 backdrop-blur-[8px] bg-white/30 z-0"></div>

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100/50 relative">

          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm font-medium text-gray-400 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email Address */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end pr-2">
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Google Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Login Failed")}
            />
          </div>

          {/* Register Redirect */}
          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline transition-all underline-offset-4">
              Register Now
            </Link>
          </p>

        </div>

        <p className="text-center mt-6 text-xs text-gray-400 font-medium">
          Safe & Secure Login
        </p>

      </div>
    </div>
  );
};

export default Login;