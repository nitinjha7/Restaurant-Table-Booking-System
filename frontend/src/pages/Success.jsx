import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/assets/logo.png";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";

const Success = () => {
  return (
    <section className="min-h-screen bg-stone-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full blur-[100px] opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white rounded-3xl p-12 max-w-lg w-full shadow-2xl shadow-orange-100/50 text-center border border-orange-50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Reservation Confirmed!
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Thank you for choosing <span className="font-semibold text-gray-900">The Social Spot</span>. 
            We have received your request and will contact you shortly to finalize your table.
          </p>

          <div className="flex justify-center">
            <Link to="/">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-200">
                <Home className="w-5 h-5" /> Return to Home
              </button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Have questions? Call us at <span className="text-gray-900 font-medium">+91 98765 43210</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Success;