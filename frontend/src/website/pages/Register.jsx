import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Phone, Lock, ArrowRight, X } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: ""
  });

  const [errors, setErrors] = useState({});

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit phone";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // remove error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        login(data.data || data);
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }

    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) =>
    `w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border ${
      errors[field] ? "border-red-400" : "border-gray-200"
    } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition text-sm shadow-sm`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl">

          {/* Close */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 text-gray-400"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-600">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Start your journey 🚀
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  name="full_name"
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={handleChange}
                  className={inputStyle("full_name")}
                />
              </div>
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputStyle("email")}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputStyle("phone")}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputStyle("password")}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className={inputStyle("confirm_password")}
                />
              </div>
              {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full py-4 rounded-xl text-white font-semibold
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              transition-all flex justify-center items-center gap-2"
            >
              {loading ? "Creating..." : <>Create Account <ArrowRight size={18} /></>}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* GOOGLE BUTTON (REAL STYLE) */}
          <button className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl bg-white hover:bg-gray-50 transition shadow-sm">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="google"
            />
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;