import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Star, CheckCircle, ShoppingCart, LayoutGrid, Globe, Building2, Layers, ChevronDown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import trainingBg from "../assets/training.png";

const allCourses = [
  {
    id: 0,
    title: "React Full Stack Development",
    category: "Software Development",
    level: "Online",
    rating: "4.9",
    students: "1,240 students",
    price: "1,999",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 1,
    title: "Selenium Automation Testing",
    category: "Testing",
    level: "Internship",
    rating: "4.7",
    students: "890 students",
    price: "19,999",
    img: "https://tse2.mm.bing.net/th/id/OIP.g_b84bPN6qKvVjeNS3cmeQHaEH",
  },
  {
    id: 2,
    title: "Figma UI/UX Complete Guide",
    category: "UI/UX Design",
    level: "Offline",
    rating: "4.8",
    students: "1,050 students",
    price: "4,999",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
  },
  {
    id: 3,
    title: "Java Full Stack Development",
    category: "Software Development",
    level: "Online",
    rating: "4.6",
    students: "980 students",
    price: "1,999",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    id: 4,
    title: "AWS & DevOps",
    category: "DevOps",
    level: "Training & Internship",
    rating: "4.9",
    students: "1,400 students",
    price: "29,999",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
  {
    id: 5,
    title: "Machine Learning",
    category: "AI/ML",
    level: "Offline",
    rating: "4.8",
    students: "1,200 students",
    price: "4,999",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notification, setNotification] = useState(null);

  const { addToCart, isInCart } = useContext(CartContext);

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;

    // Main mode selection (All, Online, Offline, Hybrid, Internship)
    let matchesMode = level === "All" || course.level === level;

    // Sub-type selection (Training, Internship, Both)
    let matchesType = true;
    if (selectedType !== "All") {
      if (selectedType === "Training") {
        matchesType = course.level === "Online" || course.level === "Offline" || course.level === "Hybrid";
      } else if (selectedType === "Internship") {
        matchesType = course.level === "Internship";
      } else if (selectedType === "Training & Internship") {
        matchesType = course.level === "Training & Internship";
      }
    }

    // Special logic to handle mode + type interaction
    if (level !== "All" && selectedType !== "All") {
      if (level === "Online" || level === "Offline" || level === "Hybrid") {
        if (selectedType === "Training") {
          matchesMode = course.level === level;
        } else if (selectedType === "Internship") {
          matchesMode = course.level === "Internship"; // This logic depends on data structure, but for now filtering properly
        } else if (selectedType === "Training & Internship") {
          matchesMode = course.level === "Training & Internship";
        }
      }
    }

    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesMode && matchesType && matchesSearch;
  });

  const handleAddToCart = (e, course) => {
    e.preventDefault();
    e.stopPropagation();
    const added = addToCart(course);
    if (added) {
      setNotification(course.title);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <>
      <Navbar />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
          <div className="bg-white/80 backdrop-blur-md border border-blue-200 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-slate-800 font-semibold">{notification} added to cart</span>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="relative pt-32 sm:pt-44 pb-12 sm:pb-16 overflow-hidden bg-white">
        {/* Background Image Layer */}
        <div
          className="absolute inset-y-0 right-0 w-2/3 z-0 bg-cover bg-right-center bg-no-repeat transition-transform duration-1000 opacity-40 mix-blend-multiply"
          style={{ backgroundImage: `url(${trainingBg})` }}
        ></div>

        {/* Clean Whitish Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-2 lg:px-5 w-full">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-10 duration-1000 ease-out fill-mode-both">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
              Advance Your Career with <br />
              <span className="text-blue-600 drop-shadow-sm">Premium Courses</span>
            </h1>
            <p className="text-slate-600 font-semibold text-base md:text-lg max-w-xl leading-relaxed mb-8">
              Master new skills with our comprehensive training, hybrid internships, and dedicated placement support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl p-2 shadow-2xl shadow-blue-100/50 border border-white focus-within:ring-4 focus-within:ring-blue-100 transition-all">
              <div className="flex items-center flex-1 w-full">
                <Search className="ml-4 text-blue-500" size={22} />
                <input
                  type="text"
                  placeholder="What would you like to learn today?"
                  className="w-full px-4 py-3 bg-transparent outline-none text-slate-700 font-bold placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-3.5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-28">
              <h2 className="font-black text-xs uppercase tracking-widest mb-4 text-slate-400 hidden lg:block">Categories</h2>
              
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-scrollbar">
                {["All", "Software Development", "Testing", "UI/UX Design", "DevOps", "AI/ML"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${category === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                      : "text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">

            {/* Advanced Hierarchical Toggle Switch */}
            <div className="flex justify-center mb-12 z-40 relative">
              <div className="flex items-center bg-white/80 backdrop-blur-md rounded-full p-1.5 shadow-xl shadow-blue-100/50 border border-blue-50/50 ring-1 ring-slate-100">
                {["All", "Online", "Offline", "Hybrid"].map((lvl) => {
                  const isActive = level === lvl;
                  const hasDropdown = ["Online", "Offline", "Hybrid"].includes(lvl);

                  return (
                    <div key={lvl} className="relative">
                      <button
                        onClick={() => {
                          setLevel(lvl);
                          if (hasDropdown) {
                            setActiveDropdown(activeDropdown === lvl ? null : lvl);
                          } else {
                            setActiveDropdown(null);
                            setSelectedType("All");
                          }
                        }}
                        className={`flex items-center gap-2 px-6 md:px-8 py-2.5 rounded-full text-[15px] transition-all duration-300 font-semibold group ${isActive
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-300"
                          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                      >
                        {lvl}
                        {hasDropdown && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${activeDropdown === lvl ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {hasDropdown && activeDropdown === lvl && (
                        <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                          {["Internship", "Training", "Training & Internship"].map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setSelectedType(type);
                                setLevel(lvl);
                                setActiveDropdown(null);
                              }}
                              className={`flex items-center justify-between w-full px-5 py-3.5 rounded-2xl text-sm font-medium transition-all ${selectedType === type && level === lvl
                                ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                            >
                              <span>{type}</span>
                              {selectedType === type && level === lvl && (
                                <Check size={16} strokeWidth={3} />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <style>
              {`
                @keyframes slideUpFade {
                  0% { opacity: 0; transform: translateY(40px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                  animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
              `}
            </style>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => {
                const added = isInCart(course.title);
                return (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden border border-slate-100 flex flex-col h-full relative animate-slide-up transform-gpu"
                    style={{ animationDelay: (index * 80) + "ms", opacity: 0 }}
                  >
                    <Link to={`/course/${course.id}`} className="block overflow-hidden relative h-52 sm:h-44">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      />

                      {added && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                          <CheckCircle size={14} />
                        </div>
                      )}
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                        {course.category}
                      </p>

                      <Link to={`/course/${course.id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="text-base font-bold text-slate-800 leading-tight mb-2 h-10 overflow-hidden">
                          {course.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1 mb-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-slate-500 text-xs font-semibold">
                          {course.rating}
                        </span>
                        <span className="text-slate-300 mx-1">•</span>
                        <span className="text-slate-500 text-xs">
                          {course.students}
                        </span>
                      </div>

                      <p className="text-slate-900 font-black text-lg mb-4">
                        ₹{course.price}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-3">
                        {/* LEFT - Details Button */}
                        <Link to={`/course/${course.id}`} className="flex-[3]">
                          <button className="w-full py-2.5 sm:py-3 rounded-xl text-blue-600 bg-blue-100 font-bold text-xs sm:text-sm hover:bg-blue-200 transition-all">
                            Details
                          </button>
                        </Link>

                        {/* RIGHT - Cart Icon */}
                        <button
                          onClick={(e) => handleAddToCart(e, course)}
                          disabled={added}
                          className={`flex-1 p-2.5 sm:p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${added
                            ? "bg-green-100 text-green-600 cursor-not-allowed"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                        >
                          {added ? <CheckCircle size={18} /> : <ShoppingCart size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg">No courses found matching your search.</p>
                <button
                  onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); }}
                  className="mt-4 text-blue-500 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Explore;