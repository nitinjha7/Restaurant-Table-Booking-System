import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
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
      toast(`Reservation ${status.toLowerCase()}`, { type: "success" });
      fetchReservations();
    } catch (err) {
      toast("Failed to update status", { type: "error" });
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${API_URL}/admin/logout`, {}, { withCredentials: true });
      toast("Logged out successfully", { type: "success" });
      navigate("/admin/login");
    } catch (err) {
      toast("Logout failed", { type: "error" });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading reservations...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin – Reservations</h1>

      <button onClick={logOut} className="mb-6 px-4 py-2 bg-red-600 text-white rounded">
        Log Out 
      </button>

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr key={r._id} className="text-center">
                  <td className="p-2 border">
                    {r.firstName} {r.lastName}
                  </td>
                  <td className="p-2 border">{r.email}</td>
                  <td className="p-2 border">{r.phone}</td>
                  <td className="p-2 border">{r.date}</td>
                  <td className="p-2 border">{r.time}</td>
                  <td className="p-2 border font-semibold">
                    {r.status}
                  </td>
                  <td className="p-2 border">
                    {r.status === "PENDING" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => updateStatus(r._id, "CONFIRMED")}
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(r._id, "REJECTED")}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
