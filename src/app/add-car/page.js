"use client";

import { useState } from "react";

export default function AddCar() {
  const [form, setForm] = useState({
    name: "",
    pricePerDay: "",
    type: "",
    image: "",
    seats: "",
    location: "",
    description: "",
    availability: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Car submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1E3C5C] mb-6">
          Add New Car
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Car Name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="pricePerDay"
            type="number"
            placeholder="Daily Rent Price"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="type"
            placeholder="Car Type (SUV / Sedan)"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="seats"
            type="number"
            placeholder="Seat Capacity"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="location"
            placeholder="Pickup Location"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <select
  name="availability"
  onChange={handleChange}
  className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white"
>
  <option value="">Select Availability</option>
  <option value="true">Available</option>
  <option value="false">Not Available</option>
</select>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F]
            hover:opacity-90 transition shadow-md"
          >
            Add Car
          </button>

        </form>
      </div>
    </div>
  );
}