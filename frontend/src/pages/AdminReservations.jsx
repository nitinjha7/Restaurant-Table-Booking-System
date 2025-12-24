import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Check, 
  X, 
  Filter, 
  TrendingUp, 
  Users, 
  Bell,
  ChefHat
} from "lucide-react";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_SERVER_URL;

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/requests`, { withCredentials: true });
      setReservations(res.data.data);
    } catch (err) {
      toast("Failed to fetch reservations", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/admin/status/${id}`, { status }, { withCredentials: true });
      toast.success(`Request ${status.toLowerCase()}`);
      fetchReservations();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${API_URL}/admin/logout`, {}, { withCredentials: true });
      toast.success("See you next time, Chef!");
      navigate("/admin/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const pendingCount = reservations.filter(r => r.status === "PENDING").length;
  const confirmedCount = reservations.filter(r => r.status === "CONFIRMED").length;
  const totalGuests = reservations.length;

  const filteredReservations = filter === "ALL" 
    ? reservations 
    : reservations.filter(r => r.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-serif animate-pulse">Preparing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800 pb-20">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-lg text-white">
            <ChefHat size={24} />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl leading-none text-gray-900">The Social Spot</h1>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Manager Dashboard</span>
          </div>
        </div>
        <button 
          onClick={logOut}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-full border border-gray-200 hover:border-red-100"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-10">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-orange-200 transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Pending Requests</p>
                <h3 className="text-3xl font-bold text-gray-900">{pendingCount}</h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-green-200 transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Confirmed Guests</p>
                <h3 className="text-3xl font-bold text-gray-900">{confirmedCount}</h3>
              </div>
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Bookings</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalGuests}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter size={20} className="text-gray-400 mr-2" />
            {["ALL", "PENDING", "CONFIRMED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === status 
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-200" 
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {filteredReservations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Calendar size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No requests found</h3>
              <p className="text-gray-500">Try changing your filters or wait for new customers.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredReservations.map((r) => (
                  <motion.div
                    key={r._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white rounded-2xl p-6 shadow-sm border relative overflow-hidden group ${
                      r.status === "PENDING" ? "border-orange-200 ring-1 ring-orange-100" : "border-gray-100"
                    }`}
                  >
                    <div className="absolute top-6 right-6">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                         r.status === "PENDING" ? "bg-orange-100 text-orange-700" :
                         r.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                         "bg-red-100 text-red-700"
                       }`}>
                         {r.status}
                       </span>
                    </div>

                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-serif ${
                         r.status === "PENDING" ? "bg-orange-50 text-orange-600" : "bg-gray-100 text-gray-500"
                      }`}>
                        {r.firstName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{r.firstName} {r.lastName}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                          <Clock size={12} />
                          <span>{new Date().toLocaleDateString()} (Request)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-gray-400 uppercase font-semibold">Date</span>
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <Calendar size={14} className="text-orange-500" />
                          {r.date}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-gray-400 uppercase font-semibold">Time</span>
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <Clock size={14} className="text-orange-500" />
                          {r.time}
                        </div>
                      </div>
                      <div className="col-span-2 space-y-1 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-400 uppercase font-semibold">Contact</span>
                        <div className="flex flex-col gap-1">
                           <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <Mail size={14} /> {r.email}
                           </div>
                           <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <Phone size={14} /> {r.phone}
                           </div>
                        </div>
                      </div>
                    </div>

                    {r.status === "PENDING" && (
                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => updateStatus(r._id, "REJECTED")}
                          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-semibold transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <X size={16} /> Decline
                        </button>
                        <button
                          onClick={() => updateStatus(r._id, "CONFIRMED")}
                          className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-orange-600 font-semibold transition-all shadow-lg shadow-gray-200 hover:shadow-orange-200 text-sm flex items-center justify-center gap-2"
                        >
                          <Check size={16} /> Accept
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
