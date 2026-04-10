// // import React, { useState } from 'react';
// // import { 
// //   UserPlus, Trash2, ShieldCheck, Ticket, FileText, 
// //   GraduationCap, Star, BookOpen, Target, Phone, CreditCard 
// // } from 'lucide-react';

// // const Users = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     college: '',
// //     branch: '',
// //     year: '2026',
// //     cgpa: '',
// //     coupon: '',
// //     paymentStatus: 'Pending' // New Field
// //   });
  
// //   const [users, setUsers] = useState([
// //     { 
// //       id: Date.now(), 
// //       name: 'Alice Cooper', 
// //       email: 'alice@college.edu', 
// //       phone: '+1 234 567 890',
// //       college: 'MIT University',
// //       branch: 'Computer Science',
// //       year: '2025',
// //       cgpa: '9.2',
// //       coupon: 'NEW50',
// //       paymentStatus: 'Paid'
// //     },
// //   ]);

// //   const TARGET_GOAL = 20; 
// //   const registrationPercentage = Math.min((users.length / TARGET_GOAL) * 100, 100);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!formData.name || !formData.email || !formData.phone) return alert("Please fill Name, Email, and Phone!");

// //     const newUser = { id: Date.now(), ...formData };
// //     setUsers([newUser, ...users]);
// //     // Reset form
// //     setFormData({ name: '', email: '', phone: '', college: '', branch: '', year: '2026', cgpa: '', coupon: '', paymentStatus: 'Pending' });
// //   };

// //   const deleteUser = (id) => {
// //     setUsers(users.filter(u => u.id !== id));
// //   };

// //   return (
// //     <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto p-4">
// //       {/* HEADER & DYNAMIC STATS */}
// //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-blue-100 pb-8">
// //         <div className="flex items-center gap-4">
// //           <div className="bg-blue-600 p-4 rounded-[2rem] shadow-xl shadow-blue-200 ring-4 ring-blue-50">
// //             <ShieldCheck className="text-white" size={32} />
// //           </div>
// //           <div>
// //             <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin <span className="text-blue-600">Elite</span></h1>
// //             <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Student Merit Registry & Analytics</p>
// //           </div>
// //         </div>

// //         <div className="bg-white p-5 rounded-[2rem] border border-blue-100 shadow-sm flex items-center gap-6 min-w-[300px]">
// //           <div className="flex-1">
// //             <div className="flex justify-between mb-2">
// //               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
// //                 <Target size={12} className="text-blue-600" /> Goal Progress
// //               </span>
// //               <span className="text-[10px] font-black text-blue-600 tracking-widest">{Math.round(registrationPercentage)}%</span>
// //             </div>
// //             <div className="w-full bg-blue-50 h-2.5 rounded-full overflow-hidden">
// //               <div className="bg-blue-600 h-full transition-all duration-1000 ease-out" style={{ width: `${registrationPercentage}%` }}></div>
// //             </div>
// //           </div>
// //           <div className="text-right border-l border-blue-50 pl-6">
// //             <div className="text-2xl font-black text-slate-900">{users.length}</div>
// //             <div className="text-[10px] font-bold text-slate-400 uppercase">Records</div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
// //         {/* LEFT: ENROLLMENT FORM */}
// //         <div className="xl:col-span-4">
// //           <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-md sticky top-8">
// //             <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-slate-800">
// //               <UserPlus className="text-blue-600" size={24} /> New Enrollment
// //             </h2>
            
// //             <form onSubmit={handleSubmit} className="space-y-5">
// //               <div>
// //                 <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">Full Name</label>
// //                 <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full p-4 rounded-2xl border border-blue-50 bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium shadow-sm" placeholder="John Doe" />
// //               </div>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">Email</label>
// //                   <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full p-4 rounded-2xl border border-blue-50 bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" placeholder="email@edu.com" />
// //                 </div>
// //                 <div>
// //                   <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">Phone Number</label>
// //                   <div className="relative">
// //                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
// //                     <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full p-4 pl-12 rounded-2xl border border-blue-50 bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" placeholder="+91..." />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">Branch Name</label>
// //                   <div className="relative">
// //                     <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={16} />
// //                     <input name="branch" value={formData.branch} onChange={handleChange} type="text" className="w-full p-4 pl-12 rounded-2xl border border-blue-50 bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold" placeholder="E.g. CSE" />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">CGPA</label>
// //                   <div className="relative">
// //                     <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
// //                     <input name="cgpa" value={formData.cgpa} onChange={handleChange} type="text" className="w-full p-4 pl-12 rounded-2xl border border-blue-50 bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold" placeholder="9.5" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">Pass Out</label>
// //                   <select name="year" value={formData.year} onChange={handleChange} className="w-full p-4 rounded-2xl border border-blue-50 bg-blue-50/30 outline-none font-bold">
// //                     <option>2024</option><option>2025</option><option>2026</option><option>2027</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label className="block text-[10px] font-black text-emerald-600 uppercase ml-1 mb-2 tracking-widest">Payment Status</label>
// //                   <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="w-full p-4 rounded-2xl border border-emerald-50 bg-emerald-50/30 outline-none font-bold text-emerald-700">
// //                     <option value="Paid">Paid</option>
// //                     <option value="Pending">Pending</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 tracking-widest">College Name</label>
// //                 <div className="relative">
// //                   <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
// //                   <input name="college" value={formData.college} onChange={handleChange} type="text" className="w-full p-4 pl-12 rounded-2xl border border-blue-50 bg-blue-50/30 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium" placeholder="University Name" />
// //                 </div>
// //               </div>

// //               <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-[2rem] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all transform active:scale-95 flex items-center justify-center gap-2">
// //                 Register Student Record
// //               </button>
// //             </form>
// //           </div>
// //         </div>

// //         {/* RIGHT: DATA TABLE */}
// //         <div className="xl:col-span-8">
// //           <div className="bg-white rounded-[2.5rem] border border-blue-100 shadow-sm overflow-hidden">
// //             <div className="p-8 border-b border-blue-50 flex justify-between items-center bg-blue-50/5">
// //               <h3 className="font-black text-xl text-slate-800 tracking-tight">Active Student Directory</h3>
// //               <button className="flex items-center gap-2 text-xs font-black text-blue-600 bg-blue-100 px-5 py-2.5 rounded-full hover:bg-blue-200 transition-all">
// //                 <FileText size={16} /> DOWNLOAD CSV
// //               </button>
// //             </div>
            
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-left">
// //                 <thead className="bg-blue-50/20">
// //                   <tr>
// //                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Profile</th>
// //                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">CGPA</th>
// //                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</th>
// //                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Origin</th>
// //                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-blue-50">
// //                   {users.map((user) => (
// //                     <tr key={user.id} className="hover:bg-blue-50/10 transition-colors group">
// //                       <td className="p-6">
// //                         <div className="flex items-center gap-4">
// //                           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black shadow-lg text-lg">
// //                             {user.name.charAt(0)}
// //                           </div>
// //                           <div>
// //                             <span className="block font-black text-slate-800 text-base">{user.name}</span>
// //                             <span className="block text-[10px] text-slate-400 font-bold">{user.email}</span>
// //                             <span className="block text-[10px] text-blue-600 font-bold">{user.phone}</span>
// //                           </div>
// //                         </div>
// //                       </td>

// //                       <td className="p-6 text-center">
// //                         <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-sm font-black border border-amber-100">
// //                           <Star size={14} className="fill-amber-500 text-amber-500"/> {user.cgpa}
// //                         </div>
// //                       </td>

// //                       <td className="p-6">
// //                         <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black border ${
// //                           user.paymentStatus === 'Paid' 
// //                           ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
// //                           : 'bg-rose-50 text-rose-600 border-rose-100'
// //                         }`}>
// //                           <CreditCard size={12} /> {user.paymentStatus}
// //                         </span>
// //                       </td>

// //                       <td className="p-6">
// //                         <div className="text-sm font-bold text-slate-700">{user.branch || 'General'}</div>
// //                         <div className="text-[10px] font-black text-blue-500 tracking-tighter uppercase">{user.college} (Batch {user.year})</div>
// //                       </td>

// //                       <td className="p-6 text-center">
// //                         <button onClick={() => deleteUser(user.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100">
// //                           <Trash2 size={20} />
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Users;

// import React, { useState } from 'react';
// import { 
//   UserPlus, ShieldCheck, Star, ChevronDown, Gift 
// } from 'lucide-react';

// const RegistrationPortal = () => {
//   const [formData, setFormData] = useState({
//     name: '', phone: '', email: '', password: '', collegeName: '',
//     branch: '', degreeType: 'B.Tech', cgpa: '', couponCode: '',
//     enrollmentType: 'Course', passOutYear: '2026', paymentStatus: 'Pending'
//   });

//   const [users, setUsers] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.password) {
//       return alert("Please complete required fields");
//     }

//     try {
//       const response = await fetch("http://10.146.66.5:8000/api/register_student/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUsers([data, ...users]);
//         alert("Student onboarded! 🚀");
//         setFormData({ 
//           name: '', phone: '', email: '', password: '', collegeName: '', 
//           branch: '', degreeType: 'B.Tech', cgpa: '', couponCode: '', 
//           enrollmentType: 'Course', passOutYear: '2026', paymentStatus: 'Pending' 
//         });
//       }
//     } catch (err) {
//       alert("Connection error.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-6 lg:p-12 font-sans text-slate-900">
//       <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
//         {/* HEADER */}
//         <header className="flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-md p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white shadow-sm gap-4">
//           <div className="flex items-center gap-4 w-full md:w-auto">
//             <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg">
//               <ShieldCheck className="text-white" size={24} />
//             </div>
//             <div>
//               <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-800">Edu<span className="text-indigo-600">Flow</span></h1>
//               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Admin Panel</p>
//             </div>
//           </div>
//           <div className="flex justify-around md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
//             <div className="text-center">
//               <p className="text-lg md:text-xl font-black text-indigo-600">{users.length}</p>
//               <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase">Students</p>
//             </div>
//             <div className="text-center">
//               <p className="text-lg md:text-xl font-black text-emerald-500">Live</p>
//               <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase">Status</p>
//             </div>
//           </div>
//         </header>

//         <main className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-start">
          
//           {/* FORM CARD */}
//           <div className="xl:col-span-5 bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-slate-200 border border-white p-6 md:p-10">
//             <div className="mb-6">
//               <h2 className="text-xl md:text-2xl font-black text-slate-800">Student Entry</h2>
//               <p className="text-slate-400 text-xs md:text-sm font-medium">Enter academic details</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
//               <div className="space-y-4">
//                 <div className="relative">
//                   <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Full Name</label>
//                   <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium" />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Email</label>
//                     <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@domain.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 md:p-4 outline-none text-sm" />
//                   </div>
//                   <div>
//                     <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Password</label>
//                     <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 md:p-4 outline-none text-sm" />
//                   </div>
//                 </div>
//               </div>

//               {/* Academic Group - Improved for mobile */}
//               <div className="p-4 md:p-6 bg-indigo-50/30 rounded-2xl md:rounded-[2rem] border border-indigo-50 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">College</label>
//                     <input name="collegeName" value={formData.collegeName} onChange={handleChange} className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-sm" />
//                   </div>
//                   <div>
//                     <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">Branch</label>
//                     <input name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-sm" />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   <div>
//                     <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">Degree</label>
//                     <select name="degreeType" value={formData.degreeType} onChange={handleChange} className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-xs font-bold">
//                       <option>B.Tech</option><option>M.Tech</option><option>BCA</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">CGPA</label>
//                     <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="0.0" className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-xs font-bold" />
//                   </div>
//                   <div className="col-span-2 sm:col-span-1">
//                     <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">Pass Out</label>
//                     <select name="passOutYear" value={formData.passOutYear} onChange={handleChange} className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-xs font-bold">
//                       <option>2025</option><option>2026</option><option>2027</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="relative">
//                   <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Enrollment</label>
//                   <select name="enrollmentType" value={formData.enrollmentType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none text-sm font-black text-indigo-600 appearance-none">
//                     <option>Course</option><option>Internship</option>
//                   </select>
//                   <ChevronDown size={16} className="absolute right-4 bottom-5 text-slate-400 pointer-events-none" />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold text-emerald-500 uppercase mb-1 block ml-1">Coupon</label>
//                   <div className="relative">
//                     <Gift size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
//                     <input name="couponCode" value={formData.couponCode} onChange={handleChange} placeholder="SAVE10" className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 pl-10 text-sm font-bold text-emerald-700" />
//                   </div>
//                 </div>
//               </div>

//               <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 md:py-5 rounded-2xl md:rounded-[2rem] hover:bg-indigo-700 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3">
//                 <UserPlus size={18} /> Register Student
//               </button>
//             </form>
//           </div>

//           {/* TABLE SECTION - Added horizontal scroll fix */}
//           <div className="xl:col-span-7 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
//             <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center">
//               <h3 className="font-black text-lg md:text-xl text-slate-800">Registry</h3>
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
//                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
//                 <span className="text-[9px] font-bold text-slate-500 uppercase">Live</span>
//               </div>
//             </div>

//             <div className="overflow-x-auto w-full">
//               <table className="w-full text-left min-w-[600px]">
//                 <thead className="bg-slate-50/50">
//                   <tr>
//                     <th className="p-4 md:p-6 text-[10px] font-bold uppercase text-slate-400">Profile</th>
//                     <th className="p-4 md:p-6 text-[10px] font-bold uppercase text-slate-400">Academics</th>
//                     <th className="p-4 md:p-6 text-[10px] font-bold uppercase text-slate-400">Type</th>
//                     <th className="p-4 md:p-6 text-[10px] font-bold uppercase text-slate-400 text-center">CGPA</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {users.length === 0 ? (
//                     <tr><td colSpan="4" className="p-12 text-center text-slate-300 italic">No data yet.</td></tr>
//                   ) : (
//                     users.map((user, idx) => (
//                       <tr key={idx} className="hover:bg-indigo-50/20 transition-colors">
//                         <td className="p-4 md:p-6">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
//                               {user.name?.charAt(0)}
//                             </div>
//                             <div className="max-w-[120px] md:max-w-none">
//                               <span className="block font-black text-slate-800 text-xs truncate">{user.name}</span>
//                               <span className="block text-[9px] text-slate-400 font-bold truncate">{user.email}</span>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="p-4 md:p-6">
//                           <div className="text-[11px] font-bold text-slate-700">{user.branch}</div>
//                           <div className="text-[9px] font-black text-indigo-400 uppercase">{user.collegeName}</div>
//                         </td>
//                         <td className="p-4 md:p-6">
//                           <span className="px-2 py-1 rounded-md text-[8px] font-black border uppercase bg-blue-50 text-blue-600 border-blue-100">
//                             {user.enrollmentType}
//                           </span>
//                         </td>
//                         <td className="p-4 md:p-6 text-center">
//                           <div className="inline-flex items-center gap-1 bg-slate-900 text-white px-2 py-1 rounded-lg text-[10px] font-black">
//                              {user.cgpa}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPortal;



import React, { useState, useEffect } from 'react';
import { 
  UserPlus, ShieldCheck, Phone, BookOpen, Star, 
  GraduationCap, ChevronDown, Lock, Mail, Gift, 
  Layers, Briefcase, Calendar, Cpu, Globe
} from 'lucide-react';

const RegistrationPortal = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    collegeName: '',
    branch: '',
    degreeType: 'B.Tech',
    cgpa: '',
    couponCode: '',
    enrollmentType: 'Course', 
    mode: 'Online',
    passOutYear: '2026',
    paymentStatus: 'Pending'
  });

  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/students/");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      return alert("Please complete the required fields (Name, Email, Phone, Password)");
    }

    try {
      const response = await fetch("http://localhost:8000/api/register_student/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setUsers([data, ...users]);
        alert("Student onboarded successfully! 🚀");
        setFormData({ 
          name: '', phone: '', email: '', password: '', collegeName: '', 
          branch: '', degreeType: 'B.Tech', cgpa: '', couponCode: '', 
          enrollmentType: 'Course', mode: 'Online', passOutYear: '2026', paymentStatus: 'Pending' 
        });
      } else {
        alert("Registration failed: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("Connection error. Is the server running?");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-indigo-200 shadow-lg">
              <ShieldCheck className="text-white" size={38} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800">Edu<span className="text-indigo-600">Flow</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Control Panel</p>
            </div>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-xl font-black text-indigo-600">{users.length}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Total Students</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
            <div className="text-center">
              <p className="text-xl font-black text-emerald-500">Live</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Server Status</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* FORM CARD */}
          <div className="xl:col-span-5 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white p-6 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800">Student Entry</h2>
              <p className="text-slate-400 text-sm font-medium">Fill in the academic details below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm font-medium" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@domain.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" />
                  </div>
                  
                  <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Phone</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                       <input name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-10 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Password</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" />
                </div>
              </div>

              <div className="p-6 bg-indigo-50/30 rounded-[2rem] border border-indigo-50 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">College Name</label>
                    <input name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="University" className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-sm" />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">Branch</label>
                    <input name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. CSE" className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">Degree</label>
                    <select name="degreeType" value={formData.degreeType} onChange={handleChange} className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-xs font-bold appearance-none">
                      <option>B.Tech</option><option>B.E</option><option>M.Tech</option><option>BCA</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">CGPA</label>
                    <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="0.0" className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-xs font-bold text-center" />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block ml-1">Pass Out</label>
                    <select name="passOutYear" value={formData.passOutYear} onChange={handleChange} className="w-full bg-white border border-indigo-100 rounded-xl p-3 outline-none text-xs font-bold appearance-none">
                      <option>2024</option><option>2025</option><option>2026</option><option>2027</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Enrollment For</label>
                  <select name="enrollmentType" value={formData.enrollmentType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-sm font-black text-indigo-600 appearance-none">
                    <option>Course</option>
                    <option>Internship</option>
                    <option>Course+Internship</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 bottom-5 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Mode</label>
                  <select name="mode" value={formData.mode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-sm font-black text-indigo-600 appearance-none">
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 bottom-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                  <label className="text-[10px] font-bold text-emerald-500 uppercase mb-1 block ml-1">Coupon Code</label>
                  <div className="relative">
                    <Gift size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input name="couponCode" value={formData.couponCode} onChange={handleChange} placeholder="SAVE10" className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 pl-10 outline-none text-sm font-bold text-emerald-700 placeholder:text-emerald-300" />
                  </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 mt-4">
                <UserPlus size={20} /> Complete Registration
              </button>
            </form>
          </div>

          {/* REGISTRY SECTION */}
          <div className="xl:col-span-7 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-black text-xl text-slate-800">Registry</h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Live Updates</span>
              </div>
            </div>

            {/* MOBILE VIEW: CARDS (Hidden on Large Screens) */}
<div className="block lg:hidden p-4 space-y-4">
  {users.length === 0 ? (
    <div className="p-10 text-center text-slate-300 italic">
      No registrations found.
    </div>
  ) : (
    users.map((user, idx) => (
      <div 
        key={idx} 
        className="bg-slate-50 border border-slate-100 rounded-3xl p-5 space-y-4 shadow-sm"
      >
        {/* Header: Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
            {user.name?.charAt(0)}
          </div>
          <div>
            <span className="block font-black text-slate-800 text-sm">
              {user.name}
            </span>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">
              {user.phone}
            </span>
          </div>
        </div>

        {/* Info Grid: Academics & CGPA */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 uppercase">
          <div className="bg-white p-2 rounded-xl border border-slate-100">
            <span className="block text-indigo-400 mb-1">Academics</span>
            {user.branch}
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-100 text-center">
            <span className="block text-indigo-400 mb-1">Score</span>
            ⭐ {user.cgpa}
          </div>
        </div>

        {/* Footer: Badges */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {user.mode}
          </span>
          <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {user.enrollmentType}
          </span>
        </div>
      </div>
    ))
  )}
</div>

            {/* DESKTOP VIEW: TABLE (Hidden on Mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-6 text-[10px] font-bold uppercase text-slate-400">Student Profile</th>
                    <th className="p-6 text-[10px] font-bold uppercase text-slate-400">Academics</th>
                    <th className="p-6 text-[10px] font-bold uppercase text-slate-400">Mode</th>
                    <th className="p-6 text-[10px] font-bold uppercase text-slate-400">Type</th>
                    <th className="p-6 text-[10px] font-bold uppercase text-slate-400 text-center">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-20 text-center text-slate-300 italic font-medium">
                        No registrations recorded.
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                              {user.name?.charAt(0)}
                            </div>
                            <div>
                              <span className="block font-black text-slate-800 text-sm mb-1">{user.name}</span>
                              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tight">{user.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-xs font-bold text-slate-700">{user.branch}</div>
                          <div className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">{user.collegeName}</div>
                        </td>
                        <td className="p-6 text-[10px] font-bold text-slate-600">
                          <Globe size={14} className="inline mr-1 text-indigo-400" /> {user.mode}
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black border uppercase ${user.enrollmentType === 'Internship' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                            {user.enrollmentType}
                          </span>
                        </td>
                        <td className="p-6 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-black">
                            <Star size={10} className="fill-amber-400 text-amber-400" /> {user.cgpa}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default RegistrationPortal;