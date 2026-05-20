"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CarDetails() {
  const { id } = useParams();

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
              car?.availability ? "text-green-600" : "text-red-600"
            }`}
          >
            {car?.availability ? "Available" : "Not Available"}
          </p>

          <p className="mt-4 text-gray-600">
            {car?.description || "No description available"}
          </p>

          {/* BOOKING FORM */}
          <form
  onSubmit={handleBooking}
  className="mt-6 border border-gray-300 rounded-xl p-6 bg-white shadow-md"
>

  <h2 className="text-xl font-bold text-[#1E3C5C] mb-5">
    Book This Car
  </h2>

  {/* DRIVER */}
  <label className="block mb-2 font-semibold text-gray-800">
    Driver Needed
  </label>

  <select
    value={driverNeeded}
    onChange={(e) => setDriverNeeded(e.target.value === "true")}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white text-black
    focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
  >
    <option value="false">No</option>
    <option value="true">Yes</option>
  </select>

  {/* NOTE */}
  <label className="block mb-2 font-semibold text-gray-800">
    Special Note
  </label>

  <textarea
    value={note}
    onChange={(e) => setNote(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white text-black
    focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
    placeholder="Example: AC needed, extra luggage, driver behavior..."
  />

  {/* BUTTON */}
  <button
    type="submit"
    disabled={bookingLoading}
    className="w-full py-3 rounded-xl text-white font-semibold
    bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F]
    hover:opacity-90 transition"
  >
    {bookingLoading ? "Booking..." : "Book Now"}
  </button>

</form>

        </div>
      </div>
    </div>
  );
}