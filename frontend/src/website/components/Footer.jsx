import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-cyan-100 text-slate-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* About */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black text-blue-700 tracking-tighter">
            TX<span className="text-slate-800">HUB</span>
          </h2>
          <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-xs">
            Empowering students worldwide with industry-essential skills through structured learning and mentorship.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">
            Resources
          </h3>
          <ul className="space-y-3 text-slate-600 text-sm font-semibold">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Course Catalog
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Learning Modes
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Student Success
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Partner Network
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">
            Support
          </h3>
          <ul className="space-y-3 text-slate-600 text-sm font-semibold">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Help Center
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Privacy Policy
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              Cookie Settings
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">
            Get in Touch
          </h3>

          <div className="space-y-3">
            <p className="text-slate-600 flex items-center gap-3 text-sm font-semibold">
              <Mail size={16} className="text-blue-500" /> info@tanvox.in
            </p>
            <p className="text-slate-600 flex items-center gap-3 text-sm font-semibold">
              <Phone size={16} className="text-blue-500" /> +91 9676507387
            </p>
            <p className="text-slate-600 flex items-center gap-3 text-sm font-semibold">
              <MapPin size={16} className="text-blue-500" /> 3rd floor JQ Chambers, 4-50/5, gachibowli, miyapur Rd ,Hyderabad, Telangana, India
            </p>
          </div>

          {/* Social Icons with Links */}
          <div className="flex gap-4 mt-2">
            {[
              {
                Icon: FaFacebook,
                link: "https://www.facebook.com/share/1a3pcCH8kK/",
              },
              {
                Icon: FaTwitter,
                link: "https://x.com/tanvox2025",
              },
              {
                Icon: FaLinkedin,
                link: "https://www.linkedin.com/company/tanvox-technologies/",
              },
              {
                Icon: FaInstagram,
                link:
                  "https://www.instagram.com/tanvox_technologies?igsh=aXpib2MxdG85cjB1",
              },
            ].map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer text-blue-600 group"
              >
                <Icon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-slate-500 mt-4 border-t border-blue-200 pt-2 text-xs">
        © 2026 TX hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;