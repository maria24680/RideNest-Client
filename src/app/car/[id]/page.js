"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CarDetails() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [driverNeeded, setDriverNeeded] = useState(false);
  const [note, setNote] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

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

  useEffect(() => {
    if (!id) return;
    fetchCar();
  }, [id]);

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
        alert("Booking Successful 🚗");
        setDriverNeeded(false);
        setNote("");
      } else {
        alert("Booking Failed ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred ❌");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Car not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow overflow-hidden">

        {/* IMAGE */}
        <img
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
              car?.availability ? "text-blue-400" : "text-red-400"
            }`}
          >
            {car?.availability ? "Available" : "Not Available"}
          </p>

          <p className="mt-4 text-gray-600">
            {car?.description || "No description available"}
          </p>

          {/* BOOKING FORM */}
              {openModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    {/* MODAL BOX */}
    <div className="bg-white w-[92%] max-w-md rounded-2xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">

        <h2 className="text-lg font-bold text-[#1E3C5C]">
          Book This Car
        </h2>

        <button
          onClick={() => setOpenModal(false)}
          className="text-red-400 text-xl font-bold hover:scale-110 transition"
        >
          ✕
        </button>

      </div>

      {/* FORM */}
      <form onSubmit={handleBooking} className="p-5 space-y-4">

        {/* DRIVER */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
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
          <label className="block mb-1 font-semibold text-gray-700">
            Special Note
          </label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Example: AC needed, extra luggage..."
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#1E3C5C] text-white font-semibold hover:bg-blue-800 transition"
        >
          <Link href = "/my-bookings">
          Confirm Booking
          </Link>
        </button>

      </form>

    </div>
  </div>
)}

  {/* BUTTON */}
  <button onClick={() => setOpenModal(true)}
  className="w-full mt-5 py-3 rounded-xl text-white bg-[#1E3C5C]"
>
  
  Book Now

  
</button>



        </div>
      </div>
    </div>
  );
}