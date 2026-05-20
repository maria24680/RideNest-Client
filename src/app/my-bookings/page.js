"use client";

import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/bookings");
        const data = await res.json();

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        alert("Booking deleted successfully");

        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-600">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-[#1E3C5C] mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-600 font-medium">
          No bookings found
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-5">
          {bookings.map((booking, index) => (
            <div
              key={booking?._id || index}
              className="bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-[#1E3C5C]">
                {booking?.carName || "Unknown Car"}
              </h2>

              <p className="text-gray-700 mt-1">
                Price: ৳{booking?.pricePerDay || "N/A"}
              </p>

              <p className="text-gray-700">
                Booking Date:{" "}
                {booking?.bookingDate
                  ? new Date(booking.bookingDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <p className="text-gray-700">
                Driver Needed: {booking?.driverNeeded ? "Yes" : "No"}
              </p>

              <p className="text-gray-500 mt-2 italic text-sm">
                Note: {booking?.note || "No note"}
              </p>

              <div className="flex gap-3 mt-5">
                <button className="bg-[#1E3C5C] text-white px-4 py-2 rounded-lg hover:bg-[#16324d] transition-colors">
                  View
                </button>

                <button
                  onClick={() => handleDelete(booking?._id)}
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}