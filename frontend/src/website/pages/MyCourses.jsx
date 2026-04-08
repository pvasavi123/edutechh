import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyCourses = () => {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          
          <div className="mb-12">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              My Learning <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 mt-4 text-base sm:text-lg font-medium max-w-2xl">
              Track your progress and continue your learning journey.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 sm:p-20 text-center border border-slate-100 shadow-2xl shadow-blue-500/5">
             <p className="text-slate-500 font-medium">Your enrolled courses will appear here.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;