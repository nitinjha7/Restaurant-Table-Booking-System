import React, { useState, useEffect } from "react";
import logo from "/assets/logo.png";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = ["home", "about", "popularDishes", "reservation", "contact"];

  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex items-center justify-between w-[90%] mx-auto py-4">
        <div className="w-20 transition-transform duration-300 hover:scale-105">
          <img src={logo} alt="Restaurant Logo" className="w-full" />
        </div>

        <button
          className="lg:hidden text-gray-600 hover:text-gray-900"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8 font-medium text-lg">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  to={item}
                  smooth={true}
                  duration={200}
                  className="nav-link cursor-pointer hover:text-primary transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/admin/login")}
            className="ml-4 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Admin
          </button>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="w-[90%] mx-auto py-4">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      to={item}
                      smooth={true}
                      duration={200}
                      className="nav-link block py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </li>
                ))}

                <li className="pt-2 border-t">
                  <button
                    onClick={() => {() => navigate("/admin/login")}}
                    className="block py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    Admin
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
