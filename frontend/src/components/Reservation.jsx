import React, { useState } from 'react';
import axios from 'axios';
import reservationbk from '/assets/reservationbk.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Calendar, Clock, Mail, Phone, User } from 'lucide-react';

const Reservation = () => {
  const navigate = useNavigate();

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
      toast("Please fill in all fields", {
        type: "error",
        position: "top-center",
        theme: "colored",
      });
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast("Please enter a valid email", {
        type: "error",
        position: "top-center",
        theme: "colored",
      });
      return false;
    }

    if (phone.length !== 10) {
      toast("Please enter a valid phone number", {
        type: "error",
        position: "top-center",
        theme: "colored",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) {
      return;
    }

    const url = import.meta.env.VITE_SERVER_URL;
    try {
      const response = await axios.post(`${url}/reservation/send`, formData);
      // console.log(response.data);
      navigate("/success");
    } catch (error) {
      console.log(error);
      toast("Something went wrong, please try again later", {
        type: "error",
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-accent py-20" id='reservation'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-title"
      >
        Book a Table
      </motion.h2>

      <div className='w-[90%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12'>
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className='w-full lg:w-1/2 glass-card p-8 space-y-6'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="space-y-2">
              <label className="block text-sm font-medium">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="date"
                name="date"
                min ={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                autoComplete="off"
              />
            </div>
          </div>

          <button
            type="submit"
            className="shadow__btn w-full"
          >
            Request a table
          </button>
          <p className='text-sm text-gray-600 text-center'>
            *Please submit your reservation details and we will contact you to confirm your booking
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='w-full lg:w-1/2'
        >
          <img
            src={reservationbk}
            alt="Reservation background"
            className='w-full h-[600px] object-cover rounded-2xl shadow-2xl'
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;