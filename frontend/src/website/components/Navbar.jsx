import React, { useState, useEffect, useContext } from "react";
import {
  ShoppingCart,
  User,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Search,
  Menu,
  X,
  Mail,
  Phone,
  LogOut
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout, user, openAuthModal } = useContext(AuthContext);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <nav
        className={`h-20 w-full flex items-center justify-between px-6 lg:px-16 transition-all duration-300 ${scrolled || isMenuOpen || !isHome
          ? "bg-white shadow-lg"
          : "bg-transparent"
          }`}
      >
        {/* LOGO */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-xl">
                <Sparkles className="text-white" size={20} />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tighter">
              TX<span className="text-blue-500">hub</span>
            </h1>
          </div>
        </Link>

        {/* SEARCH BAR (Hidden on mobile) */}
        <div className="hidden md:flex relative items-center w-1/3">
          <Search className="absolute left-4 text-blue-400" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full bg-blue-50/50 border border-blue-100 py-2.5 pl-12 pr-4 rounded-2xl text-sm focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all outline-none text-slate-700"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Explore (Desktop) */}
          <button
            onClick={() => navigate("/explore")}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-slate-600 font-semibold hover:bg-blue-100 hover:text-blue-600 transition-all"
          >
            <LayoutGrid size={18} />
            <span>Explore</span>
            <ChevronDown size={14} className="opacity-60" />
          </button>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition-all"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* Auth Actions (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => openAuthModal("login")}
                  className="px-5 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all font-display"
                >
                  Login
                </button>

                <button
                  onClick={() => openAuthModal("register")}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-blue-300 hover:scale-105 transition-all duration-300 font-display"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => navigate("/my-courses")}
                  className="hidden md:block px-5 py-2.5 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all"
                >
                  My Courses
                </button>

                {/* Profile Avatar Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className={`flex items-center gap-2 p-1 pr-3 rounded-full border-2 transition-all duration-300 ${isProfileMenuOpen ? "border-blue-500 bg-blue-50" : "border-transparent hover:bg-slate-50"
                      }`}
                  >
                    <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 uppercase">
                      {user?.full_name?.charAt(0) || user?.email?.charAt(0) || <User size={20} />}
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  {/* Desktop Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
                      {/* User Info Section */}
                      <div className="p-5 border-b border-slate-50 mb-2">
                        <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-3">Your Account</p>
                        <h4 className="text-lg font-black text-slate-800 leading-tight mb-4">
                          {user?.full_name || user?.email || "Academic Profile"}
                        </h4>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors">
                            <div className="p-1.5 bg-slate-50 rounded-lg"><Mail size={14} /></div>
                            <span className="text-sm font-semibold truncate">{user?.email || "No email available"}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors">
                            <div className="p-1.5 bg-slate-50 rounded-lg"><Phone size={14} /></div>
                            <span className="text-sm font-semibold">{user?.phone || "No phone added"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid gap-1">
                        <button
                          onClick={() => { navigate("/my-courses"); setIsProfileMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-600 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all text-sm"
                        >
                          <LayoutGrid size={18} />
                          My Courses
                        </button>
                        <button
                          onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-red-500 font-black hover:bg-red-50 transition-all text-sm mt-1"
                        >
                          <LogOut size={18} />
                          Logout Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 text-slate-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-20 bg-slate-900/60 backdrop-blur-sm z-[-1] sm:hidden animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)}></div>
        )}
        <div
          className={`absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden sm:hidden z-[100] ${isMenuOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
            }`}
        >
          <div className="px-6 py-8 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <button
              onClick={() => { navigate("/explore"); setIsMenuOpen(false); }}
              className="flex items-center gap-4 px-5 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-base shadow-sm active:scale-95 transition-all"
            >
              <LayoutGrid size={24} />
              Explore All Courses
            </button>

            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={() => { openAuthModal("login"); setIsMenuOpen(false); }}
                  className="px-6 py-4 text-base font-black text-blue-600 bg-blue-50/50 rounded-2xl text-center active:scale-95 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { openAuthModal("register"); setIsMenuOpen(false); }}
                  className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-base text-center shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Create Free Account
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 p-6 bg-slate-50/80 rounded-[2rem] border border-slate-100 mb-2">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 text-xl">
                      {user?.full_name?.charAt(0).toUpperCase() || <User size={28} />}
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-800 leading-tight">{user?.full_name || "New Student"}</p>
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">Pro Member</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 mt-1 space-y-3">
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="p-1.5 bg-white rounded-lg"><Mail size={16} /></div>
                      <span className="text-sm font-bold opacity-90 truncate max-w-[200px]">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="p-1.5 bg-white rounded-lg"><Phone size={16} /></div>
                      <span className="text-sm font-bold opacity-90">{user?.phone || "Phone not added"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => { navigate("/my-courses"); setIsMenuOpen(false); }}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-base shadow-sm active:scale-95 transition-all"
                  >
                    <LayoutGrid size={20} />
                    My Learning Dashboard
                  </button>

                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="flex items-center justify-center gap-3 px-6 py-4 text-base font-black text-red-600 bg-red-50 rounded-2xl active:scale-95 transition-all"
                  >
                    <LogOut size={20} />
                    Secure Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Contact Info */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4 px-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Help & Support</p>
              <div className="flex justify-center gap-6 text-slate-400">
                <Mail size={20} />
                <Phone size={20} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;