import React, { useState, useContext } from "react";
import { Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";


const trendingCourses = [
  {
    id: 0,
    title: "React Full Stack Development",
    category: "Development",
    students: "1,240 students",
    rating: "4.9",
    price: "1999",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 1,
    title: "Selenium Automation Testing",
    category: "Testing",
    students: "890 students",
    rating: "4.7",
    price: "19,999",
    img: "https://tse2.mm.bing.net/th/id/OIP.g_b84bPN6qKvVjeNS3cmeQHaEH?pid=Api&P=0&h=180",
  },
  {
    id: 2,
    title: "Figma UI/UX Complete Guide",
    category: "UI/UX Design",
    students: "1,050 students",
    rating: "4.8",
    price: "10000",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
  },
];

const popularCourses = [
  {
    id: 4,
    title: "AWS & DevOps",
    category: "DevOps",
    students: "2,100 students",
    rating: "4.9",
    price: "10000",
    img: "https://tse4.mm.bing.net/th/id/OIP.FRaBEI8XYMZ8X0MjENuclQHaD4?pid=Api&P=0&h=180",
  },
  {
    id: 3,
    title: "Java Full Stack Development",
    category: "Development",
    students: "1,800 students",
    rating: "4.8",
    price: "15000",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    id: 5,
    title: "Machine Learning",
    category: "AI/ML",
    students: "950 students",
    rating: "4.7",
    price: "20000",
    img: "https://tse4.mm.bing.net/th/id/OIP.SQfKDBTDMvca6c2hP_GGtwHaEB?pid=Api&P=0&h=180",
  },
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { addToCart, isInCart } = useContext(CartContext);

  const courses =
    activeTab === "trending" ? trendingCourses : popularCourses;

  const handleAddToCart = (e, course) => {
    e.stopPropagation();
    const added = addToCart(course);
    if (added) {
      setNotification(course.title);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <section className="bg-slate-50 py-20 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
          <div className="bg-white/80 backdrop-blur-md border border-blue-200 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-slate-800 font-semibold">{notification} added to cart</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our Courses
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-blue-500 mx-auto mt-6 rounded-full"
          ></motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "trending"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-300"
                }`}
            >
              Trending Courses
            </button>

            <button
              onClick={() => setActiveTab("popular")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "popular"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-300"
                }`}
            >
              Popular Courses
            </button>
          </div>
        </div>


        {/* Course Cards Container */}
        <motion.div
          layout
          className="grid md:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="contents"
            >
              {courses.map((course, index) => {
                const added = isInCart(course.title);
                return (
                  <motion.div
                    key={course.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 cursor-pointer flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {added && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                          <CheckCircle size={16} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                          {course.category}
                        </p>
                      </div>

                      <h3 className="text-lg font-bold text-slate-800 leading-tight">
                        {course.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className={s <= Math.round(parseFloat(course.rating)) ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
                        ))}
                        <span className="text-slate-500 text-xs font-semibold ml-1">
                          {course.rating}
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm mt-2 mb-4">
                        {course.students}
                      </p>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <p className="text-slate-900 font-bold text-lg">
                          ₹{course.price}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/course/${index}`);
                          }}
                          className="px-6 py-2.5 rounded-xl text-blue-600 bg-blue-50 font-bold text-xs hover:bg-blue-100 transition-all"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
