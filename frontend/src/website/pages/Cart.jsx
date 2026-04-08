import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trash2, ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { isLoggedIn, openAuthModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    // Handle both string "$99" and number 6999 formats
    const priceValue = typeof item.price === "string"
      ? parseInt(item.price.replace(/[^0-9]/g, ""))
      : item.price;
    return sum + (priceValue || 0);
  }, 0);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      openAuthModal();
    } else {
      navigate("/checkout", { state: { items: cart } });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-8 font-medium">
            <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600 font-bold">Shopping Cart</span>
          </div>

          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Cart</h1>
              <p className="text-slate-500 mt-2 font-medium">
                {cart.length === 0 ? "Your cart is currently empty" : `You have ${cart.length} courses in your cart`}
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => navigate("/explore")}
                className="text-blue-600 font-bold hover:underline flex items-center gap-1 group"
              >
                Continue Shopping <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="text-blue-500" size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">Your cart is feeling light!</h2>
              <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">
                Explore our world-class courses and start your learning journey today.
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:scale-105 transition-all active:scale-95"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 items-start">

              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-white border border-slate-100 rounded-3xl p-5 flex gap-6 items-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        {item.category || "Course"}
                      </p>
                      <h2 className="text-lg font-black text-slate-800 truncate">{item.title}</h2>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
                          {item.mode || "Online"}
                        </span>
                        <span className="text-blue-600 font-black text-lg">₹{typeof item.price === 'string' ? item.price.replace(/[^0-9]/g, "") : item.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.title)}
                      className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group/btn"
                    >
                      <Trash2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-blue-500/5 sticky top-28">
                <h2 className="text-xl font-black text-slate-800 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 font-bold text-sm">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-bold text-sm">
                    <span>Platform Fee</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="h-px bg-slate-100 my-4"></div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Amount</p>
                      <p className="text-3xl font-black text-blue-600 italic mt-1">₹{total}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                  >
                    {isLoggedIn ? "Checkout Now" : "Sign in to Proceed"}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
                    Secure 128-bit SSL Payment
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;