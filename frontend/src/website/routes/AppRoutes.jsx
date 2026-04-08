// import { Routes, Route } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import Modes from "../components/Modes";
// import WhyChoose from "../components/WhyChoose";
// import Partners from "../components/Partners";
// import FAQ from "../components/FAQ";
// import Footer from "../components/Footer";
// import Courses from "../components/Courses";

// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Explore from "../pages/Explore";
// import Cart from "../pages/Cart";
// import CourseDetails from "../pages/CourseDetails";
// import ForgotPassword from "../pages/ForgotPassword";
// import Enroll from "../pages/Enroll";   // ADD THIS
// import MyCourses from "../pages/MyCourses";
// function Home() {
//   return (
//     <div className="w-full overflow-x-hidden">
//       <Navbar />
//       <div className="pt-20">
//         <Hero />
//         <Categories />
//         <Courses />
//         <Modes />
//         <WhyChoose />
//         <Partners />
//         <FAQ />
//         <Footer />
//       </div>
//     </div>
//   );
// }

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/explore" element={<Explore />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/course/:id" element={<CourseDetails />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//  <Route path="/my-courses" element={<MyCourses />} />
//       {/* ADD THIS ROUTE */}
//       <Route path="/enroll" element={<Enroll />} />
//     </Routes>
//   );
// };

// export default AppRoutes;


import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Modes from "../components/Modes";
import WhyChoose from "../components/WhyChoose";
import Partners from "../components/Partners";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import Enroll from "../pages/Enroll";   // ADD THIS
import MyCourses from "../pages/MyCourses";
import CheckoutPage from "../pages/CheckoutPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Explore from "../pages/Explore";
import Cart from "../pages/Cart";
import CourseDetails from "../pages/CourseDetails";
import ForgotPassword from "../pages/ForgotPassword";
import AuthModal from "../components/AuthModal";

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <Hero />
        <Categories />
        <Courses />
        <Modes />
        <WhyChoose />
        <Partners />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

const AppRoutes = () => {
  return (
    <>
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </>
  );
};

export default AppRoutes;