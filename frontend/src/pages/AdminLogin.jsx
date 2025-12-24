import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ChefHat, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Welcome back to The Social Spot");
      navigate("/admin/reservations");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@gmail.com");
    setPassword("1234");
    toast.info("Demo credentials applied! Click Access to login.");
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-stone-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-100 rounded-full blur-[80px] opacity-30 translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-gray-200 p-8 relative z-10 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-600">
            <ChefHat size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 text-center">
            The Social Spot
          </h1>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Admin Portal
          </p>
        </div>

        <form onSubmit={login} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="admin@thesocialspot.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-stone-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all text-gray-900 placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-gray-200 hover:shadow-orange-200 flex items-center justify-center gap-2 group ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-3 bg-orange-50 text-orange-700 font-medium rounded-xl hover:bg-orange-100 transition-colors duration-300 border border-orange-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Use Demo Credentials</span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} The Social Spot. All rights reserved.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminLogin;