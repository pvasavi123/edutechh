import React, { useState, useContext } from "react";
import { X, Mail, Lock, User, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const BASE_URL = "http://127.0.0.1:8000";

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, modalView, setModalView } =
    useContext(AuthContext);

  const isLoginView = modalView === "login";
  const toggleView = () =>
    setModalView(isLoginView ? "register" : "login");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ MAIN AUTH FUNCTION (LOGIN + REGISTER + ADMIN CHECK)
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLoginView ? "verify/" : "register/";

      const payload = isLoginView
        ? { email: form.email, password: form.password }
        : {
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        };

      if (!isLoginView && form.password !== form.confirm_password) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (isLoginView) {
          login(data.data || data);
          alert("Login Successful");

          // ✅ ADMIN LOGIN CHECK
          const userEmail = (form.email || "").trim().toLowerCase();

          if (userEmail.endsWith("@admin.org")) {
            window.location.href = "http://localhost:3000/admin"; // admin panel
          } else {
            closeAuthModal(); // normal user
          }
        } else {
          alert("Registration Successful! Please login.");
          setModalView("login");
        }
      } else {
        alert(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogle = async (credentialResponse) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/google/`, {
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
        login(data.data);

        // ✅ ADMIN CHECK FOR GOOGLE LOGIN ALSO
        const userEmail = (data?.data?.email || "").toLowerCase();

        if (userEmail.endsWith("@admin.org")) {
          window.location.href = "http://localhost:3000/admin";
        } else {
          closeAuthModal();
        }

        alert("Google Login Successful");
      } else {
        alert(data.error || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Google server error");
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={closeAuthModal}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border overflow-hidden">

        {/* Close */}
        <button
          onClick={closeAuthModal}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100"
        >
          <X size={22} />
        </button>

        <div className="p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black">
              {isLoginView ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500">
              {isLoginView ? "Login to continue" : "Start your journey"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">

            {!isLoginView && (
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
                required
              />
            </div>

            {!isLoginView && (
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
                required
              />
            </div>

            {isLoginView && (
              <div className="flex justify-end pr-2">
                <Link
                  to="/forgot-password"
                  onClick={closeAuthModal}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {!isLoginView && (
              <div className="relative">
                <CheckCircle className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
                  required
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLoginView ? "Login" : "Register"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="border-t"></div>
            <div className="absolute inset-0 flex justify-center -mt-3">
              <span className="bg-white px-3 text-gray-400 text-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogle}
              onError={() => alert("Google Failed")}
            />
          </div>

          {/* Toggle */}
          <div className="text-center mt-6 text-sm">
            {isLoginView
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button onClick={toggleView} className="text-blue-600 font-bold">
              {isLoginView ? "Register" : "Login"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;