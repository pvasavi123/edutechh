import React from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Bug,
  Database,
  Brain,
  Server,
  Users
} from "lucide-react";

const categories = [
  {
    name: "Software Development",
    icon: Code,
    // Coding on a laptop
    img: "https://img.favpng.com/12/10/7/systems-development-life-cycle-software-development-process-computer-software-agile-software-development-png-favpng-8zhGV0cDHHeGd6rxP8jRWy1NE.jpg",
  },
  {
    name: "Testing",
    icon: Bug,
    // Quality assurance / analytical
    img: "https://tse1.mm.bing.net/th/id/OIP.aejFa4IBs52-V3v9XAvYYQHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Data Science",
    icon: Database,
    // Charts and data analysis
    img: "https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science.jpg",
  },
  {
    name: "AI / ML",
    icon: Brain,
    // Digital brain / technology
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "DevOps",
    icon: Server,
    // Server room / data center
    img: "https://tse1.mm.bing.net/th/id/OIP.p3KMadD3ow0HicHQ-O4KCgHaEc?pid=Api&P=0&h=180",
  },
  {
    name: "Soft Skills",
    icon: Users,
    // Team meeting / collaboration
    img: "https://tse3.mm.bing.net/th/id/OIP.3mCmAHxmTNMfOguqYAS6ogHaFW?pid=Api&P=0&h=180",
  },
];

const Categories = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Course Categories
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
            Advance your career with specialized paths designed by industry experts.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col border border-slate-100"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    // Adding error handling just in case
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" }}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  {/* Floating Icon Box */}
                  <div className="absolute -top-7 left-8 bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg border-4 border-white">
                    <Icon className="text-white" size={24} />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                      Master {cat.name} through hands-on labs, real-world projects, and personalized mentorship.
                    </p>
                  </div>
                  
                  {/* "Learn More" Link (Visible on hover) */}
                  <Link
  to="/explore"
  className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
>
  Explore Path <span className="ml-2">→</span>
</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;