"use client";

import { useEffect, useState } from "react";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH
  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:5000/car");
      const data = await res.json();

      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    const ok = confirm("Delete this car?");
    if (!ok) return;

    await fetch(`http://localhost:5000/car/${id}`, {
      method: "DELETE",
    });

    setCars((prev) => prev.filter((c) => c._id !== id));
  };

  // ✏️ UPDATE (simple prompt version)
  const handleUpdate = async (car) => {
    const newPrice = prompt("Update price per day:", car.pricePerDay);
    if (!newPrice) return;

    const newLocation = prompt("Update location:", car.location);

    await fetch(`http://localhost:5000/car/${car._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pricePerDay: newPrice,
        location: newLocation,
      }),
    });

    fetchCars();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center text-[#1E3C5C] mb-8">
        My Added Cars
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {cars.map((car) => (
          <div key={car._id} className="bg-white rounded-xl shadow p-4">

            <img
              src={car.image}
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-2">{car.name}</h2>

            <p>Price: ৳{car.pricePerDay}</p>
            <p>Location: {car.location}</p>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-4">

              <button
                onClick={() => handleUpdate(car)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}