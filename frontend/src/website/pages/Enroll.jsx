import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentModal from "./PaymentModal";
import { CalendarDays, CheckCircle } from "lucide-react";

const Enroll = () => {
  const [date, setDate] = useState("");
  const [slotBooked, setSlotBooked] = useState(false);
  const [slotPaid, setSlotPaid] = useState(false);
  const [coursePaid, setCoursePaid] = useState(false);
  const [eligible, setEligible] = useState(false);

  const [paymentType, setPaymentType] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentFor, setPaymentFor] = useState("");

  const course = {
    title: "React Full Stack Development",
    price: 25000,
    installment: 5000,
    months: 5,
    duration: "3 Months",
    mode: "Hybrid",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: ENROLLMENT STEPS */}
          <div className="lg:col-span-7 space-y-10">
            <header>
              <h1 className="text-3xl font-black text-slate-800 mb-2">Enrollment</h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100">Step 1 of 2: Secure Your Seat</p>
            </header>

            {/* Slot Booking */}
            <section className="bg-white rounded-[2rem] border-2 border-slate-50 shadow-xl shadow-slate-100/50 p-8 space-y-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <CalendarDays size={20} />
                </div>
                Book Your Seat (Seat Reservation Fee ₹500)
              </h2>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  Select Batch Start Date
                </label>
                <select
                  className="w-full h-12 px-4 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-colors font-bold text-slate-700 bg-slate-50/50"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                >
                  <option value="">Please select a batch...</option>
                  <option>10 April 2026</option>
                  <option>25 April 2026</option>
                  <option>10 May 2026</option>
                </select>

                <button
                  onClick={() => {
                    setPaymentAmount(500);
                    setPaymentFor("slot");
                    setShowPayment(true);
                  }}
                  disabled={!date || slotPaid}
                  className={`w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${slotPaid ? 'bg-green-100 text-green-600 border-2 border-green-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'}`}
                >
                  {slotPaid ? (
                    <>
                      <CheckCircle size={24} />
                      Seat Reserved
                    </>
                  ) : (
                    "Pay Seat Fee ₹500"
                  )}
                </button>
              </div>
            </section>

            {/* Payment Plan */}
            <section className={`bg-white rounded-[2rem] border-2 border-slate-50 shadow-xl shadow-slate-100/50 p-8 space-y-6 transition-all duration-500 ${!slotPaid ? "opacity-40 grayscale pointer-events-none" : ""}`}>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <CheckCircle size={20} />
                </div>
                Select Payment Plan
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <label className={`flex flex-col gap-2 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentType === 'full' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Full Payment</span>
                    <input
                      type="radio"
                      value="full"
                      name="payment"
                      onChange={(e) => setPaymentType(e.target.value)}
                      checked={paymentType === 'full'}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </div>
                  <p className="text-sm font-black text-blue-600 italic text-2xl mt-2">₹{course.price}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Single payout</p>
                </label>

                <label className={`flex flex-col gap-2 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentType === 'installment' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Installments</span>
                    <input
                      type="radio"
                      value="installment"
                      name="payment"
                      onChange={(e) => setPaymentType(e.target.value)}
                      checked={paymentType === 'installment'}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </div>
                  <p className="text-sm font-black text-blue-600 italic text-2xl mt-2">₹{course.installment}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">₹{course.installment} × {course.months} months</p>
                </label>
              </div>

              <button
                onClick={() => {
                  setPaymentAmount(
                    paymentType === "installment" ? course.installment : course.price
                  );
                  setPaymentFor("course");
                  setShowPayment(true);
                }}
                disabled={!paymentType || coursePaid}
                className={`w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${coursePaid ? 'bg-green-100 text-green-600 border-2 border-green-200' : 'bg-slate-900 text-white hover:bg-black shadow-slate-900/20'}`}
              >
                {coursePaid ? (
                  <>
                    <CheckCircle size={24} />
                    Enrollment Complete
                  </>
                ) : (
                  "Proceed to Final Payment"
                )}
              </button>

              {eligible && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl animate-in slide-in-from-top-1 duration-300">
                  <p className="text-sm font-black text-blue-700 flex items-center gap-2 lowercase tracking-tight">
                    <CheckCircle size={16} /> Verified: Academic eligibility requirements met.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-white border-2 border-slate-50 shadow-[0_32px_64px_-16px_rgba(30,41,59,0.1)] rounded-[3rem] p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic text-slate-800 tracking-tight">Order summary</h2>
                <div className="p-2 bg-slate-50 rounded-full">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
              </div>

              {/* Enrollment Context */}
              <div className="space-y-4 pt-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Enrollment Details</p>
                <div className="group flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-300">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-base leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[9px] text-blue-600 font-black uppercase tracking-tighter bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">
                        {date || "Select Date"}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        {course.mode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-slate-500 font-bold">
                  <span className="text-xs uppercase tracking-widest">Subtotal:</span>
                  <span className="text-lg font-black italic text-slate-800">₹{course.price}</span>
                </div>

                {paymentFor === "slot" && (
                  <div className="flex justify-between items-center text-slate-500 font-bold">
                    <span className="text-xs uppercase tracking-widest group-hover:text-slate-800 transition-colors">Payable Now:</span>
                    <span className="text-2xl font-black italic text-blue-600">₹500</span>
                  </div>
                )}

                {paymentFor === "course" && (
                  <div className="flex justify-between items-center text-slate-500 font-bold">
                    <span className="text-xs uppercase tracking-widest">Payable Now ({paymentType === 'installment' ? 'Installment' : 'Full'}):</span>
                    <span className="text-3xl font-black italic text-blue-600">₹{paymentAmount}</span>
                  </div>
                )}

                <div className="h-px bg-slate-100 my-4"></div>
              </div>

              <div className="space-y-6 pt-2">
                <p className="text-[11px] text-slate-400 text-center font-bold leading-relaxed italic uppercase tracking-wider">
                  Secure checkout with instant delivery.
                </p>

                {/* Social Proof Mini */}
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Guaranteed</p>
                  <p className="text-xs font-bold text-slate-700 leading-snug">
                    Join thousands of graduates. Placement assistance starts immediately after enrollment.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          amount={paymentAmount}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            if (paymentFor === "slot") {
              setSlotPaid(true);
              setSlotBooked(true);
            } else {
              setCoursePaid(true);
              setEligible(true);
            }
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default Enroll;