"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // DELETE MODAL STATES
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:5000/bookings"
        );

        const data = await res.json();

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Error fetching bookings:",
          error
        );

        toast.error("Failed to load bookings ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // DELETE BOOKING
  const handleDelete = async () => {
    if (!selectedBookingId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/bookings/${selectedBookingId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success(
          "Booking deleted successfully ✅"
        );

        setBookings((prevBookings) =>
          prevBookings.filter(
            (booking) =>
              booking._id !== selectedBookingId
          )
        );

        setDeleteModal(false);
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      console.error(
        "Error deleting booking:",
        error
      );

      toast.error(
        "Server error while deleting ❌"
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-600">
        Loading bookings...
      </div>
    );
  }

  return (
    <>
      {/* TOASTIFY */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <div className="min-h-screen bg-gray-100 p-6">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-[#1E3C5C] mb-8">
          My Bookings
        </h1>

        {/* EMPTY */}
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
                
                {/* BOOKING INFO */}
                <h2 className="text-xl font-bold text-[#1E3C5C]">
                  {booking?.carName ||
                    "Unknown Car"}
                </h2>

                <p className="text-gray-700 mt-1">
                  Price: ৳
                  {booking?.pricePerDay ||
                    "N/A"}
                </p>

                <p className="text-gray-700">
                  Booking Date:{" "}
                  {booking?.bookingDate
                    ? new Date(
                        booking.bookingDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <p className="text-gray-700">
                  Driver Needed:{" "}
                  {booking?.driverNeeded
                    ? "Yes"
                    : "No"}
                </p>

                <p className="text-gray-500 mt-2 italic text-sm">
                  Note:{" "}
                  {booking?.note || "No note"}
                </p>

                {/* DELETE BUTTON */}
                <div className="flex gap-3 mt-5">
                  
                  <button
                    onClick={() => {
                      setSelectedBookingId(
                        booking?._id
                      );

                      setDeleteModal(true);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Delete Booking
              </h2>

              <p className="text-gray-600">
                Are you sure you want to delete
                this booking?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                
                <button
                  onClick={() =>
                    setDeleteModal(false)
                  }
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}