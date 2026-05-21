"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [driverNeeded, setDriverNeeded] = useState(false);
  const [note, setNote] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // FETCH CAR - defined inside useEffect
  useEffect(() => {
    if (!id) return;
    
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:5000/car/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.log(error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCar();
  }, [id]); // No ESLint warning now

  // BOOKING
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setBookingLoading(true);

      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          carId: car?._id,
          carName: car?.name,
          pricePerDay: car?.pricePerDay,
          driverNeeded,
          note,
          bookingDate: new Date(),
        }),
      });

      if (res.ok) {
        toast.success("Booking Successful 🚗");

        setDriverNeeded(false);
        setNote("");
        setOpenModal(false);

        setTimeout(() => {
          router.push("/my-bookings");
        }, 1500);
      } else {
        toast.error("Booking Failed ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    } finally {
      setBookingLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // NOT FOUND
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Car not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        
        {/* IMAGE */}
        <Image
        width={400}
        height={400}
          src={car?.image}
          alt={car?.name}
          className="w-full h-80 object-cover"
        />

        {/* DETAILS */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1E3C5C]">
            {car?.name}
          </h1>

          <p className="mt-2 text-gray-700">
            Type: {car?.type || "N/A"}
          </p>

          <p className="text-gray-700">
            Seats: {car?.seats || "N/A"}
          </p>

          <p className="text-gray-700">
            Location: {car?.location || "N/A"}
          </p>

          <p className="text-gray-700">
            Price: ৳{car?.pricePerDay}/day
          </p>

          <p
            className={`mt-2 font-medium ${
              car?.availability
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {car?.availability ? "Available" : "Not Available"}
          </p>

          <p className="mt-4 text-gray-600">
            {car?.description || "No description available"}
          </p>

          {/* BOOK BUTTON */}
          <button
            onClick={() => setOpenModal(true)}
            className="w-full mt-6 py-3 rounded-xl bg-[#1E3C5C] text-white font-semibold hover:bg-blue-900 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          
          {/* MODAL BOX */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-[#1E3C5C]">
                Book This Car
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-red-500 text-2xl font-bold hover:scale-110 transition"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleBooking}
              className="p-5 space-y-4"
            >
              
              {/* DRIVER */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Driver Needed
                </label>

                <select
                  value={driverNeeded}
                  onChange={(e) =>
                    setDriverNeeded(e.target.value === "true")
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {/* NOTE */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Special Note
                </label>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Example: AC needed, extra luggage..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3 rounded-xl bg-[#1E3C5C] text-white font-semibold hover:bg-blue-800 transition disabled:opacity-50"
              >
                {bookingLoading
                  ? "Booking..."
                  : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}