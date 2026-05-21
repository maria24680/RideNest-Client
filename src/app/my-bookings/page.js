"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyBookings() {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `http://localhost:5000/bookings?email=${session?.user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${tokenData?.token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const handleDelete = async () => {
    if (!selectedBookingId) return;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `http://localhost:5000/bookings/${selectedBookingId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Booking deleted successfully");

        setBookings((prev) =>
          prev.filter((b) => b._id !== selectedBookingId)
        );

        setDeleteModal(false);
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading bookings...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-black">
            No bookings found
          </p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white p-4 rounded-xl shadow text-black"
              >
                <h2 className="text-xl font-bold text-black">
                  {b.carName}
                </h2>

                <p className="text-black">
                  Price: {b.pricePerDay}
                </p>

                <p className="text-black">
                  Date:{" "}
                  {new Date(b.bookingDate).toLocaleDateString()}
                </p>

                <p className="text-black">
                  Driver: {b.driverNeeded ? "Yes" : "No"}
                </p>

                <p className="text-black">
                  Note: {b.note}
                </p>

                <button
                  onClick={() => {
                    setSelectedBookingId(b._id);
                    setDeleteModal(true);
                  }}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl text-black">
              <h2 className="text-xl mb-4">
                Delete this booking?
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white"
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