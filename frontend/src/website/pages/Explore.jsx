import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Star, CheckCircle, ShoppingCart, LayoutGrid, Globe, Building2, Layers, ChevronDown, Check, Filter, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import trainingBg from "../assets/training.png";
import testingImg from "../assets/testing.png";

const allCourses = [
  {
    id: 0,
    title: "React Full Stack Development",
    category: "Software Development",
    level: "Online",
    rating: "4.9",
    students: "1,240 students",
    price: "3,999",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 1,
    title: "Selenium Automation Testing",
    category: "Testing",
    level: "Internship",
    rating: "4.7",
    students: "890 students",
    price: "3,999",
    img: "https://tse2.mm.bing.net/th/id/OIP.g_b84bPN6qKvVjeNS3cmeQHaEH",
  },
  {
    id: 2,
    title: "Figma UI/UX Complete Guide",
    category: "UI/UX Design",
    level: "Offline",
    rating: "4.8",
    students: "1,050 students",
    price: "3,999",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
  },
  {
    id: 3,
    title: "Java Full Stack Development",
    category: "Software Development",
    level: "Online",
    rating: "4.6",
    students: "980 students",
    price: "3,999",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    id: 4,
    title: "AWS & DevOps",
    category: "DevOps",
    level: "Training & Internship",
    rating: "4.9",
    students: "1,400 students",
    price: "3,999",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
  {
    id: 5,
    title: "Machine Learning",
    category: "AI/ML",
    level: "Offline",
    rating: "4.8",
    students: "1,200 students",
    price: "3,999",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    id: 6,
    title: "MERN Stack Manual Testing",
    category: "Testing",
    level: "Training & Internship",
    rating: "4.8",
    students: "650 students",
    price: "3,999",
    img: testingImg,
  },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState(location.state?.category || "All");
  const [notification, setNotification] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const { addToCart, isInCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user for enrollment check
  const [userEnrollments, setUserEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`http://localhost:8000/api/enrollments/?email=${user.email}`);
          const data = await res.json();
          if (res.ok) setUserEnrollments(data.data || []);
        } catch (err) {
          console.error("Failed to fetch enrollments:", err);
        }
      }
    };
    fetchEnrollments();
  }, [user]);

  const isEnrolled = (courseTitle) => {
    return userEnrollments.some(e => e.title.includes(courseTitle));
  };

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
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
      {/* Navbar is now handled globally */}

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
      <section className="relative pt-28 sm:pt-36 pb-8 sm:pb-12 overflow-hidden bg-[#f0f7ff]">
        {/* Background Image Layer */}
        <div
          className="absolute inset-y-0 right-0 w-2/3 z-0 bg-cover bg-right-center bg-no-repeat transition-transform duration-1000 opacity-20 mix-blend-multiply"
          style={{ backgroundImage: `url(${trainingBg})` }}
        ></div>

        {/* Clean Light Blue Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#f0f7ff] via-[#f0f7ff]/90 to-transparent"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 w-full">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-10 duration-1000 ease-out fill-mode-both">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
              Advance with <span className="text-blue-600">Premium Courses</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm sm:text-base max-w-lg leading-relaxed mb-6">
              Master new skills with our comprehensive training and placement support.
            </p>

            <div className="mt-6 flex flex-col gap-4 max-w-2xl bg-white/90 backdrop-blur-xl rounded-[2rem] p-2 sm:p-1.5 shadow-2xl shadow-blue-500/10 border border-white/50 transition-all sm:flex-row sm:items-center sm:rounded-full">
              <div className="flex items-center flex-1 bg-slate-50/50 rounded-2xl sm:bg-transparent">
                <Search className="ml-5 text-blue-500 shrink-0" size={22} />
                <input
                  type="text"
                  placeholder="What would you like to learn today?"
                  className="w-full px-4 py-3.5 bg-transparent outline-none text-slate-700 font-bold placeholder:text-slate-400 text-sm sm:text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden p-3 mr-2 bg-white text-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 active:scale-95"
                >
                  <Filter size={20} />
                </button>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 sm:py-3.5 rounded-2xl sm:rounded-full font-black hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95 text-sm sm:text-base uppercase tracking-wider">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 z-10 self-start bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-blue-500/5">
              <h2 className="font-black text-xs uppercase tracking-widest mb-4 text-slate-400 font-sans">Filter Categories</h2>

              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-scrollbar px-1">
                {["All", "Software Development", "Testing", "UI/UX Design", "DevOps", "AI/ML", "Data Science", "Soft Skills"].map((cat) => (
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

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        {/* Enroll/Cart Actions */}
                        {isEnrolled(course.title) ? (
                          <Link to="/my-courses" className="block w-full">
                            <button className="w-full py-3.5 rounded-2xl bg-green-50 text-green-600 font-black text-sm border border-green-100 flex items-center justify-center gap-2 hover:bg-green-100 transition-all">
                              <CheckCircle size={20} />
                              Already Enrolled
                            </button>
                          </Link>
                        ) : (
                          <div className="flex gap-2">
                            {/* Enroll Now (Takes primary position) */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!added) addToCart(course);
                                navigate("/checkout", { state: { items: [course] } });
                              }}
                              className="flex-[4] py-1.5 bg-blue-400 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                              {/* <Zap size={14} className="fill-white" /> */}
                              Enroll Now
                            </button>

                            {/* Add to Cart (Icon Action) */}
                            <button
                              onClick={(e) => handleAddToCart(e, course)}
                              disabled={added}
                              className={`flex-1 py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center ${added
                                ? "bg-green-100 text-green-600 cursor-not-allowed border-green-200"
                                : "bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border border-slate-100"
                                }`}
                              title={added ? "Added to Cart" : "Add to Cart"}
                            >
                              {added ? <CheckCircle size={22} /> : <ShoppingCart size={22} />}
                            </button>
                          </div>
                        )}
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
                  onClick={() => { setSearch(""); setCategory("All"); }}
                  className="mt-4 text-blue-500 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[300] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsFilterDrawerOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[3rem] shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800">Filters</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Refine your search</p>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-3 bg-slate-50 rounded-2xl text-slate-400 active:scale-90 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-24">
              {/* Category Selection */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Select Category</p>
                <div className="grid grid-cols-2 gap-2">
                  {["All", "Software Development", "Testing", "UI/UX Design", "DevOps", "AI/ML"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-3 rounded-2xl font-bold text-sm transition-all ${category === cat
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-slate-50 text-slate-600 border border-transparent hover:border-slate-200"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-slate-50">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer is now handled globally */}
    </>
  );
};

export default Explore;