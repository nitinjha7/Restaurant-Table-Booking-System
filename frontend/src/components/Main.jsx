import React from "react";
import mainImg from "/assets/main.jpeg";
import { FlipWords } from "./ui/flip-words";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { ArrowRight, Star, Utensils, ChevronDown, PlayCircle } from "lucide-react";

const Main = () => {
  const words = ["Unforgettable", "Delightful", "Magical", "Exquisite"];

  return (
    <section className="relative w-full min-h-screen flex items-center bg-stone-50 overflow-hidden pt-20 lg:pt-0" id="home">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="w-[90%] max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col gap-8"
        >

          <div className="text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-gray-900 leading-[1.1] tracking-tight">
            <span className="block">Taste the</span>
            <div className="text-orange-600 flex items-center gap-3">
              <FlipWords 
                words={words} 
                className="text-orange-600 font-serif font-bold pl-0"
              />
            </div>
          </div>

          <p className="text-lg text-gray-500 leading-relaxed max-w-xl font-medium">
            Step into a world where flavor knows no bounds. We blend tradition with modern artistry to craft dishes that don't just feed the body, but feed the soul.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-2">
            <Link to="reservation" smooth={true} duration={500}>
              <button className="group px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-xl shadow-gray-200 hover:bg-orange-600 hover:shadow-orange-200 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3">
                <span>Book a Table</span>
                <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </Link>
            
            <Link to="popularDishes" smooth={true} duration={500}>
              <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full border border-gray-200 hover:border-gray-900 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group">
                <Utensils className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                <span>Explore Menu</span>
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200/60">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-[3px] border-stone-50 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Diner" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-[3px] border-stone-50 bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                2k+
              </div>
            </div>
            <div>
              <div className="flex text-orange-500 gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-semibold text-gray-700">Trusted by Foodies</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="relative z-10 w-full h-[650px] rounded-t-full rounded-b-[200px] overflow-hidden border-[8px] border-white shadow-2xl shadow-gray-200/80">
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            <img
              src={mainImg}
              alt="Signature Dish"
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[2s]"
            />
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 -left-12 z-20 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-gray-900">4.9</span>
              <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-tight">
              "The best dining experience in the city."
            </p>
          </motion.div>

          <div className="absolute top-10 -right-10 w-32 h-32 border-2 border-orange-200 rounded-full z-0 animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-10 -right-10 w-32 h-32 flex items-center justify-center">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Main;
