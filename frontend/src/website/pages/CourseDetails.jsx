


import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Star, CheckCircle, Clock, Calendar, MapPin, Globe, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

/**
 * Detailed course data including all curricula, requirements, and metadata.
 * Indexed by ID to match the Explore page navigation.
 */
const courseData = [
  {
    id: 0,
    title: "React Full Stack Development",
    description: "Master the art of building scalable web applications using the MERN stack (MongoDB, Express, React, Node.js). This course takes you from frontend fundamentals to advanced backend architecture.",
    price: "3,999",
    rating: "4.9",
    students: "1,240 students",
    language: "English",
    duration: "3 Months",
    mode: "Online",
    location: "Hyderabad",
    batchStart: "04 May 2026",
    category: "Software Development",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    instructor: "John Developer",
    instructorBio: "Senior Full Stack Engineer with 10+ years of experience in React and Node.js ecosystems.",
    instructorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    instructorCourses: [
      { id: 3, title: "Java Full Stack Development", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", price: "3,999" },
      { id: 5, title: "Machine Learning Masterclass", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995", price: "3,999" }
    ],
    learn: [
      "Modern React Hook & Context API",
      "Node.js & Express REST APIs",
      "MongoDB Database Design",
      "Fullstack Authentication with JWT"
    ],
    content: [
      "Introduction to Modern Web Development",
      "React Components & State Management",
      "Backend Development with Node.js",
      "Database Integration & Deployment"
    ],
    requirements: [
      "Basic HTML, CSS, and JavaScript knowledge",
      "A laptop with at least 8GB RAM",
      "Curiosity to learn and build projects"
    ]
  },
  {
    id: 1,
    title: "Selenium Automation Testing",
    description: "Go from manual tester to automation expert. Learn how to write robust, maintainable test scripts using Selenium WebDriver and Java for enterprise-level applications.",
    price: "3,999",
    rating: "4.7",
    students: "890 students",
    language: "English",
    duration: "2 Months",
    mode: "Internship",
    location: "Remote",
    batchStart: "15 April 2026",
    category: "Testing",
    img: "https://tse2.mm.bing.net/th/id/OIP.g_b84bPN6qKvVjeNS3cmeQHaEH",
    instructor: "Ravi Testing",
    learn: [
      "Selenium WebDriver Architectures",
      "TestNG & Maven Integration",
      "Page Object Model (POM) Design",
      "Cucumber & BDD Frameworks"
    ],
    content: [
      "Automation Fundamentals",
      "Writing Your First Test Script",
      "Advanced Locators & Actions",
      "Framework Development from Scratch"
    ],
    requirements: [
      "Basic programming knowledge",
      "Interest in automation and QA",
      "A machine with Java installed"
    ],
    instructorBio: "Expert QA Automation Engineer specialized in Selenium and Java testing frameworks.",
    instructorImage: "https://randomuser.me/api/portraits/men/45.jpg",
    instructorCourses: [
      { id: 0, title: "React Full Stack", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", price: "3,999" }
    ]
  },
  {
    id: 2,
    title: "Figma UI/UX Complete Guide",
    description: "Design stunning user interfaces and research impactful user experiences. This course covers everything from wireframing to high-fidelity prototyping in Figma.",
    price: "3,999",
    rating: "4.8",
    students: "1,050 students",
    language: "English",
    duration: "1.5 Months",
    mode: "Offline",
    location: "Hyderabad",
    batchStart: "04 May 2026",
    category: "UI/UX Design",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
    instructor: "Design Expert Sarah",
    learn: [
      "User Research & Empathy Mapping",
      "Wireframing & Visual Design",
      "Interactive Prototyping in Figma",
      "Design Systems & Handover"
    ],
    content: [
      "UX Design Foundations",
      "Mastering Figma Layouts & Components",
      "Visual Design Principles",
      "Portfolio Project & Review"
    ],
    requirements: [
      "No prior design experience needed",
      "A creative mindset",
      "Figma account (free version is fine)"
    ]
  },
  {
    id: 3,
    title: "Java Full Stack Development",
    description: "Become an enterprise-ready Java developer. Learn Core Java, Spring Boot, and React to build secure, high-performance web applications used by major corporations.",
    price: "3,999",
    rating: "4.6",
    students: "980 students",
    language: "English",
    duration: "3 Months",
    mode: "Online",
    location: "Hyderabad",
    batchStart: "04 May 2026",
    category: "Software Development",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    instructor: "Advanced Java Guru",
    learn: [
      "Core Java & Multi-threading",
      "Spring Boot & Microservices",
      "React Integration with Java APIs",
      "Database Security & SQL"
    ],
    content: [
      "Java Language Deep-Dive",
      "Developing Backend with Spring",
      "Frontend with React & Redux",
      "Project Deployment & CI/CD"
    ],
    requirements: [
      "Basic understanding of programming",
      "Familiarity with logic and math",
      "Passionate about enterprise tech"
    ]
  },
  {
    id: 4,
    title: "AWS & DevOps",
    description: "Master the cloud. Learn to manage infrastructure at scale using AWS services, Docker, Kubernetes, and modern DevOps tools to speed up delivery cycles.",
    price: "3,999",
    rating: "4.9",
    students: "1,400 students",
    language: "English",
    duration: "2.5 Months",
    mode: "Training & Internship",
    location: "Remote",
    batchStart: "04 May 2026",
    category: "DevOps",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    instructor: "Cloud Solutions Architect",
    learn: [
      "AWS Core Services (EC2, S3, RDS)",
      "Containerization with Docker",
      "Kubernetes Orchestration",
      "Jenkins & CI/CD Pipelines"
    ],
    content: [
      "Cloud Foundation & IAM",
      "Virtualization & Networking",
      "Infrastructure as Code",
      "Monitoring & Scaling Strategies"
    ],
    requirements: [
      "Basic Networking knowledge",
      "Familiarity with the Linux terminal",
      "An active AWS Free Tier account"
    ]
  },
  {
    id: 5,
    title: "Machine Learning",
    description: "Step into the world of Data Science and AI. Learn the math, the algorithms, and the Python tools required to build predictive models and analyze complex datasets.",
    price: "3,999",
    rating: "4.8",
    students: "1,200 students",
    language: "English",
    duration: "3 Months",
    mode: "Offline",
    location: "Remote",
    batchStart: "5 May 2026",
    category: "AI/ML",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    instructor: "ML Scientist Alex",
    learn: [
      "Supervised & Unsupervised Learning",
      "Python Data Science Libraries",
      "Neural Networks & Deep Learning",
      "Model Training & Optimizaton"
    ],
    content: [
      "Statistics & Linear Algebra",
      "Regression & Decision Trees",
      "Natural Language Processing",
      "AI Ethical Considerations"
    ],
    requirements: [
      "Intermediate Python knowledge",
      "Basic understanding of Calculus",
      "A machine capable of running ML libs"
    ]
  },
  {
    id: 6,
    title: "MERN Stack Manual Testing",
    description: "Master the specific manual testing workflows for modern MERN stack applications. Learn how to validate MongoDB schemas, test Express APIs, verify React frontend states, and ensure Node.js runtime reliability through systematic QA processes.",
    price: "3,999",
    rating: "4.8",
    students: "650 students",
    language: "English",
    duration: "2 Months",
    mode: "Training & Internship",
    location: "Remote",
    batchStart: "04 May 2026",
    category: "Testing",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    instructor: "QA Specialist Alex",
    learn: [
      "Manual verification of MongoDB data integrity",
      "Manual API testing (Postman) for Express routes",
      "React Component state and UI validation",
      "Cross-browser and responsiveness testing"
    ],
    content: [
      "Introduction to MERN QA",
      "Database Validation Strategies",
      "API Manual Verification Workflow",
      "UI/UX & State Integrity Testing"
    ],
    requirements: [
       "Basic understanding of web applications",
       "Curiosity for finding bugs and edge cases",
       "Laptop with internet access"
    ]
  }
];

const relatedCourses = [
  { id: 3, title: "Java Full Stack Development", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", price: "3,999" },
  { id: 4, title: "AWS & DevOps", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", price: "3,999" },
  { id: 2, title: "Figma UI/UX Complete Guide", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e", price: "3,999" },
];

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useContext(CartContext);

  const { isLoggedIn, openAuthModal, user } = useContext(AuthContext);
  const [notification, setNotification] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.email) return;
      try {
        const response = await fetch(`http://localhost:8000/api/enrollments/?email=${user.email}`);
        const data = await response.json();
        if (response.ok) setEnrollments(data.data || []);
      } catch (err) { console.error("Enrollment check failed"); }
    };
    fetchEnrollments();
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const course = courseData.find(c => c.id.toString() === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-800 mb-4">Course Not Found</h2>
          <button onClick={() => navigate("/explore")} className="text-blue-600 font-bold hover:underline">
            ← Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const added = isInCart(course.title);
  const enrolled = enrollments.some(e => e.items.some(item => item.id === course.id));

  const handleEnroll = () => {
    if (!isLoggedIn) {
      openAuthModal("login");
    } else {
      navigate("/checkout", { state: { items: [course], direct: true } });
    }
  };

  const handleAddToCart = () => {
    const success = addToCart(course);
    if (success) {
      setNotification(course.title);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <>
      {/* Navbar handled globally */}

      {/* Dynamic Toast Notification */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-white/90 backdrop-blur-md border border-blue-200 px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-slate-800 font-black text-lg leading-none">{notification}</p>
              <p className="text-slate-400 text-sm mt-1">Has been added to your cart</p>
            </div>
          </div>
        </div>
      )}

      <section className="pt-28 pb-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

          {/* MAIN CONTENT COLUMN */}
          <div className="lg:col-span-2">

            {/* Featured Image & Overlays */}
            <div className="relative group overflow-hidden rounded-[2.5rem]">
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-96 md:h-[30rem] object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-8 left-8 flex gap-3">
                <span className="bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl text-blue-600 font-black shadow-sm uppercase tracking-widest text-[10px]">
                  {course.category}
                </span>
                <span className="bg-blue-600 px-5 py-2.5 rounded-2xl text-white font-black shadow-lg uppercase tracking-widest text-[10px]">
                  {course.mode}
                </span>
              </div>
            </div>

            {/* Title & Stats */}
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-10 tracking-tight leading-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="font-black text-yellow-700 text-lg">{course.rating}</span>
                <span className="text-yellow-600/50 text-sm font-bold">({course.students.split(' ')[0]})</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-bold italic">
                <Globe size={18} className="text-blue-400" />
                <span>{course.language}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-bold italic">
                <Calendar size={18} className="text-blue-400" />
                <span>Starts {course.batchStart}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xl mt-8 leading-relaxed font-medium">
              {course.description}
            </p>

            {/* Premium Info Grid */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-blue-500/5 mt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { label: "Duration", value: course.duration, icon: <Clock className="text-blue-500" size={20} /> },
                { label: "Batch Start", value: course.batchStart, icon: <Calendar className="text-blue-500" size={20} /> },
                { label: "Location", value: course.location, icon: <MapPin className="text-blue-500" size={20} /> },
                { label: "Certificate", value: "Available", icon: <GraduationCap className="text-blue-500" size={20} /> },
                { label: "Level", value: "All Levels", icon: <BookOpen className="text-blue-500" size={20} /> },
                { label: "Access", value: "Lifetime", icon: <Globe className="text-blue-500" size={20} /> }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="font-black text-slate-800 text-lg ml-7">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs for Learning/Curriculum */}
            <div className="mt-12 space-y-12">
              {/* Learning Goals */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-blue-500/[0.02]">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                  What You Will Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learn.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                      <div className="bg-white p-1 rounded-full shadow-sm">
                        <CheckCircle className="text-blue-500 shrink-0" size={22} />
                      </div>
                      <span className="font-bold text-slate-600 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Section */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-blue-500/[0.02]">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 font-display">
                  <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                  Curriculum Content
                </h2>
                <div className="space-y-4">
                  {course.content.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-6 rounded-2xl border border-slate-100 hover:border-blue-500/20 hover:bg-blue-50/20 transition-all cursor-pointer group">
                      <div className="flex items-center gap-6">
                        <span className="text-3xl font-black text-slate-100 group-hover:text-blue-500/20 transition-all">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-black text-slate-700 text-lg">{item}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Locked
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-blue-500/[0.02]">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <div className="h-8 w-1 bg-red-500 rounded-full"></div>
                  Prerequisites
                </h2>
                <ul className="space-y-4">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-600 font-bold">
                      <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor Section */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-blue-500/[0.02]">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                  About the Instructor
                </h2>
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <img src={course.instructorImage || "https://randomuser.me/api/portraits/men/32.jpg"} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" alt="instructor" />
                  <div>
                    <h3 className="text-xl font-black text-slate-800">{course.instructor}</h3>
                    <p className="text-blue-600 font-bold text-sm mb-2">Lead Instructor & Tech Lead</p>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{course.instructorBio || "World-class instructor with practical industry experience."}</p>
                  </div>
                </div>

                {course.instructorCourses && course.instructorCourses.length > 0 && (
                  <div className="mt-8">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">More Courses by {course.instructor}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {course.instructorCourses.map((rel, i) => (
                        <div key={i} onClick={() => navigate(`/course/${rel.id}`)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer group">
                          <img src={rel.img} className="w-16 h-16 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-all" alt="rel" />
                          <div>
                            <p className="font-bold text-slate-700 text-sm leading-tight mb-1">{rel.title}</p>
                            <p className="text-blue-600 font-black text-xs">₹{rel.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR PANEL */}
          <div className="relative">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.1)] sticky top-28 p-10 flex flex-col items-center">

              <div className="w-full text-center mb-10">
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-2 px-4 py-1.5 bg-slate-50 rounded-full inline-block">Enrollment Fee</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl font-black text-blue-600 italic tracking-tighter">₹{course.price}</span>
                </div>
                <p className="text-slate-400 text-sm font-bold mt-4 italic">No hidden charges • GST Included</p>
              </div>

              {/* USP List */}
              <div className="w-full space-y-5 mb-12">
                {[
                  { text: "Full lifetime access", color: "text-green-500" },
                  { text: "Certificate of completion", color: "text-green-500" },
                  { text: "Access on all devices", color: "text-green-500" },
                  { text: "24/7 Premium Support", color: "text-green-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-600 font-black text-sm">
                    <div className="bg-green-50 p-1.5 rounded-lg border border-green-100">
                      <CheckCircle className="text-green-500" size={16} />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-4">
                {enrolled ? (
                  <button
                    onClick={() => navigate("/my-courses")}
                    className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-green-500/20 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                  >
                    Go to My Courses <ArrowRight size={22} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleEnroll}
                      disabled={added}
                      className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-2xl relative overflow-hidden group ${added
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                        : "bg-blue-600 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:translate-y-0"
                        }`}
                    >
                      <span className="relative z-10">{added ? "Already in Cart" : "Enroll Now"}</span>
                      {!added && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>}
                    </button>

                    {!added && (
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-5 rounded-2xl border-2 border-blue-600 text-blue-600 font-black text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
                      >
                        Add to Cart
                      </button>
                    )}
                  </>
                )}

                <button className="w-full py-4 text-slate-400 font-black hover:text-slate-800 text-[10px] uppercase tracking-widest transition-all">
                  Apply Discount Coupon
                </button>
              </div>

              {/* Satisfaction Guarantee */}
              <div className="mt-10 border-t border-slate-50 pt-8 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Premium Learning Experience</p>
              </div>

            </div>
          </div>

        </div>

        {/* Recommended Footer */}
        <div className="max-w-7xl mx-auto px-6 mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Recommended Courses</h2>
            <button className="text-blue-600 font-black flex items-center gap-2 hover:gap-3 transition-all">Explore All <ArrowRight size={20} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedCourses.map((rel, i) => (
              <div
                key={i}
                onClick={() => navigate(`/course/${rel.id}`)}
                className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-500/[0.03] hover:shadow-2xl transition-all cursor-pointer group"
              >
                <img src={rel.img} className="w-full h-48 object-cover rounded-[2rem] group-hover:scale-[1.02] transition-all" alt={rel.title} />
                <div className="p-4">
                  <h3 className="font-black text-slate-800 text-lg leading-tight mb-2">{rel.title}</h3>
                  <p className="text-blue-600 font-black text-xl italic">₹{rel.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default CourseDetails;


