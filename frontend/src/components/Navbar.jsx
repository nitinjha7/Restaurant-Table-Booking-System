import React, { useState, useEffect } from "react";
import logo from "/assets/logo.png";
import { Link } from "react-scroll";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Story" },
    { id: "popularDishes", label: "Menu" },
    { id: "reservation", label: "Book Table" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="w-[90%] max-w-7xl mx-auto flex items-center justify-between">
        <Link to="home" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2 group">
           <img src={logo} alt="The Social Spot" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
           <div className="hidden sm:block">
             <h1 className={`text-xl font-serif font-bold tracking-wide transition-colors ${isScrolled ? "text-gray-900" : "text-gray-800"}`}>
               The Social <span className="text-orange-600">Spot</span>
             </h1>
           </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  smooth={true}
                  duration={500}
                  className={`relative text-sm font-medium cursor-pointer transition-colors group py-1 ${
                    isScrolled ? "text-gray-600 hover:text-orange-600" : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-orange-600 border border-orange-200 bg-orange-50 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 ml-4 shadow-sm"
          >
            <ShieldCheck size={16} />
            <span>Admin</span>
          </button>
        </div>

        <button
          className={`lg:hidden transition-colors p-2 ${isScrolled ? "text-gray-900" : "text-gray-800"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <ul className="flex flex-col p-6 space-y-4 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-serif text-gray-800 hover:text-orange-600 transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <div className="h-px bg-gray-100 w-full my-2"></div>
              <li>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/admin/login");
                  }}
                  className="text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center justify-center gap-2 w-full py-2"
                >
                   <ShieldCheck size={18} /> Admin Access
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;