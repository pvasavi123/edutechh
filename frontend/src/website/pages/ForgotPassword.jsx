import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Key, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

/**
 * ForgotPassword Page
 * Handles three-step flow:
 * Step 1: Request reset (Verify email exists, get simulated OTP)
 * Step 2: Verify OTP
 * Step 3: Reset Password (New Password + Confirm Password)
 */
const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Passwords, 4: Success
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // Simulated OTP from backend
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const resp = await fetch("http://localhost:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "request" }),
      });

      const data = await resp.json();

      if (resp.ok) {
        setOtp(data.otp); // Store simulated OTP
        setMessage("OTP has been sent to your email ID. Please check your inbox.");
        setStep(2);
      } else {
        setError(data.error || "Verification failed");
      }
    } catch (err) {
      setError("Network error. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === otp) {
      setStep(3);
      setError("");
      setMessage("Identity verified. Please set your new password.");
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const resp = await fetch("http://localhost:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: newPassword, action: "reset" }),
      });

      const data = await resp.json();

      if (resp.ok) {
        setMessage(data.message);
        setStep(4); // success state
      } else {
        setError(data.error || "Reset failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-300/20 rounded-full blur-[120px]" />
      <div className="absolute inset-0 backdrop-blur-[8px] bg-white/30 z-0" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100/50 relative">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-6 shadow-inner">
              {step === 1 && <Mail className="w-10 h-10 text-blue-600" />}
              {step === 2 && <ShieldCheck className="w-10 h-10 text-blue-600" />}
              {step === 3 && <Key className="w-10 h-10 text-blue-600" />}
              {step === 4 && <CheckCircle2 className="w-10 h-10 text-emerald-500" />}
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Enter OTP"}
              {step === 3 && "New Password"}
              {step === 4 && "Success!"}
            </h2>
            <p className="text-sm font-medium text-gray-400 mt-2">
              {step === 1 && "Verify your account email"}
              {step === 2 && `Enter the 6-digit code sent to ${email}`}
              {step === 3 && "Secure your account with a new password"}
              {step === 4 && "Your password has been updated"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-shake">
              {error}
            </div>
          )}

          {message && step !== 4 && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-sm font-bold">
              {message}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleRequest} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send OTP <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  maxLength="6"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-center text-2xl tracking-[0.5em] text-gray-700"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 mt-4"
              >
                Verify OTP <ArrowRight size={20} />
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Reset Password <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Link
                to="/login"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                Go to Login <ArrowRight size={20} />
              </Link>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            {step > 1 && step < 4 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" /> Back
              </button>
            ) : (
              <Link 
                to="/login" 
                className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Login
              </Link>
            )}
          </div>

        </div>

        <p className="text-center mt-8 text-xs text-gray-400 font-medium uppercase tracking-widest">
          EduTech Secure Authentication
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;