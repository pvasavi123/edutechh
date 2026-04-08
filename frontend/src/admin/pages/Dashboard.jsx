// 

import React from 'react';
import { Mail, Phone, Users, BookOpen, Layers, Award } from 'lucide-react';

const Dashboard = () => {
  const courseStats = [
    { id: 1, name: 'Full Stack', count: 45, icon: <Layers size={18} />, color: 'bg-blue-600' },
    { id: 2, name: 'UI/UX Design', count: 32, icon: <BookOpen size={18} />, color: 'bg-indigo-500' },
    { id: 3, name: 'Data Science', count: 18, icon: <Award size={18} />, color: 'bg-cyan-500' },
  ];

  const trainers = [
    { id: 1, name: 'Vasavi', role: 'Full Stack', photo: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jayanth', role: 'QA', photo: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Hima Teja', role: 'QA', photo: 'https://i.pravatar.cc/150?u=3' },
  ];

  return (
    // <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500 p-1 md:p-0">
    <div className="min-h-screen bg-[#F4F7FE] pt-10 lg:pt-20 px-4 md:px-10 pb-20 space-y-10 animate-in fade-in duration-700 font-sans">

      {/* 1. TOP STATS SECTION */}
      <section>
        <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 md:mb-6">System Overview</h2>

        {/* Changed to grid-cols-1 for mobile, md:grid-cols-2, and lg:grid-cols-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {/* Total Users Card */}
          <div className="bg-blue-600 p-5 md:p-6 rounded-2xl md:rounded-[2rem] text-white shadow-xl shadow-blue-100 flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-[10px] font-bold uppercase mb-1">Total Users</p>
              <h3 className="text-2xl md:text-3xl font-black">124</h3>
            </div>
            <div className="bg-white/20 p-2.5 md:p-3 rounded-xl md:rounded-2xl">
              <Users size={24} className="md:w-7 md:h-7" />
            </div>
          </div>

          {/* Dynamic Course Stats */}
          {courseStats.map((course) => (
            <div key={course.id} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-blue-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`${course.color} text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-lg shrink-0`}>
                {course.icon}
              </div>
              <div>
                <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-wider leading-tight">{course.name}</p>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">
                  {course.count} <span className="text-[10px] md:text-xs text-slate-400 font-medium lowercase">students</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TRAINER SECTION */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-slate-400">Available Trainers</h2>
          <button className="text-blue-600 font-bold text-xs md:text-sm hover:underline">View All</button>
        </div>

        {/* Responsive grid for trainer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {trainers.map((t) => (
            <div key={t.id} className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-center">

              <div className="relative mb-4 md:mb-6 w-fit mx-auto">
                <img
                  src={t.photo}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] object-cover ring-4 md:ring-8 ring-blue-50 group-hover:ring-blue-100 transition-all"
                  alt={t.name}
                />
                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-green-500 w-4 h-4 md:w-6 md:h-6 border-2 md:border-4 border-white rounded-full"></div>
              </div>

              <div className="mb-5 md:mb-6">
                <h3 className="font-bold text-lg md:text-xl text-slate-800">{t.name}</h3>
                <p className="text-blue-500 font-semibold text-xs md:text-sm tracking-wide">{t.role}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex justify-center items-center">
                  <Mail size={18} />
                </button>
                <button className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex justify-center items-center">
                  <Phone size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;