import React, { useState } from "react";
import reservationbk from "/assets/reservationbk.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  Utensils,
  ArrowRight,
  Sparkles,
  PartyPopper
} from "lucide-react";

const Reservation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formValidation = () => {
    const { firstName, lastName, email, date, time, phone } = formData;
    if (!firstName || !lastName || !email || !date || !time || !phone) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;

    setLoading(true);
    const url = import.meta.env.VITE_SERVER_URL;

    try {
      await axios.post(`${url}/reservation/send`, formData);
      navigate("/success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
        time: "",
        phone: "",
      });
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-stone-50 py-20 flex items-center justify-center overflow-hidden" id="reservation">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gray-900 overflow-hidden z-0">
        <img 
            src={reservationbk} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50"></div>
      </div>

      <div className="w-[95%] max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-gray-900 pt-10"
          >
             <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Utensils className="w-6 h-6" />
             </div>
             
             <h2 className="text-5xl font-serif font-bold leading-tight mb-6">
               Save your <br />
               <span className="text-orange-600 italic">Seat at the Table.</span>
             </h2>
             
             <p className="text-gray-600 text-lg leading-relaxed mb-8">
               From intimate dinners to celebratory feasts, we are ready to host you. 
               Book your reservation online to guarantee your spot in our dining room.
             </p>

             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Instant Confirmation</h4>
                    <p className="text-sm text-gray-500">Receive an email immediately.</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <PartyPopper size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Special Occasions</h4>
                    <p className="text-sm text-gray-500">Let us know if you're celebrating.</p>
                  </div>
               </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 p-8 lg:p-10 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

               <form onSubmit={handleSubmit} className="space-y-8">
                 <div>
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <User size={16} /> Guest Information
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-sm font-semibold text-gray-700">First Name</label>
                       <input
                         type="text"
                         name="firstName"
                         placeholder="John"
                         value={formData.firstName}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-sm font-semibold text-gray-700">Last Name</label>
                       <input
                         type="text"
                         name="lastName"
                         placeholder="Doe"
                         value={formData.lastName}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium"
                       />
                     </div>
                     <div className="space-y-1 md:col-span-2">
                       <label className="text-sm font-semibold text-gray-700">Email Address</label>
                       <div className="relative">
                         <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                         <input
                           type="email"
                           name="email"
                           placeholder="john@example.com"
                           value={formData.email}
                           onChange={handleChange}
                           className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium"
                         />
                       </div>
                     </div>
                     <div className="space-y-1 md:col-span-2">
                       <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                       <div className="relative">
                         <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                         <input
                           type="tel"
                           name="phone"
                           placeholder="9876543210"
                           value={formData.phone}
                           onChange={handleChange}
                           className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium"
                         />
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="h-px w-full bg-gray-100"></div>

                 <div>
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Calendar size={16} /> Date & Time
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-sm font-semibold text-gray-700">Select Date</label>
                       <input
                         type="date"
                         name="date"
                         min={new Date().toISOString().split("T")[0]}
                         value={formData.date}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium text-gray-600"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-sm font-semibold text-gray-700">Select Time</label>
                       <input
                         type="time"
                         name="time"
                         value={formData.time}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium text-gray-600"
                       />
                     </div>
                   </div>
                 </div>

                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full group bg-gray-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-orange-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
                 >
                   {loading ? "Processing Request..." : "Confirm Reservation"}
                   {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                 </button>
               </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
