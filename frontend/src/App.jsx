import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Success from './pages/Success'
import AdminReservations from './pages/AdminReservations'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reservations" element={
          <ProtectedRoute>
            <AdminReservations />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App