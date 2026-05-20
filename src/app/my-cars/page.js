"use client";

import { useEffect, useState } from "react";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/car");
        const data = await res.json();

        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    const ok = window.confirm("Delete this car?");
    if (!ok) return;

    try {
      await fetch(`http://localhost:5000/car/${id}`, {
        method: "DELETE",
      });

      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleUpdate = async (car) => {
    if (!car?._id) return;

    const newPrice = window.prompt("Update price per day:", car.pricePerDay);
    if (!newPrice) return;

    const newLocation = window.prompt("Update location:", car.location);
    if (!newLocation) return;

    try {
      const res = await fetch(`http://localhost:5000/car/${car._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          pricePerDay: newPrice,
          location: newLocation,
        }),
      });

      if (res.ok) {
        setCars((prevCars) =>
          prevCars.map((c) =>
            c._id === car._id
              ? { ...c, pricePerDay: newPrice, location: newLocation }
              : c
          )
        );
        alert("Car updated successfully!");
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-600">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-[#1E3C5C] mb-8">
        My Added Cars
      </h1>

      {cars.length === 0 ? (
        <div className="text-center text-gray-600 font-medium">
          No cars found
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div key={car?._id || index} className="bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <img
                src={car?.image || "https://placehold.co/600x400?text=No+Image"}
                alt={car?.name || "Car"}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-2 text-gray-800">
                {car?.name || "Unknown Car"}
              </h2>

              <p className="text-gray-700 mt-1">Price: ৳{car?.pricePerDay || "N/A"}</p>
              <p className="text-gray-700">Location: {car?.location || "N/A"}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleUpdate(car)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(car?._id)}
                  className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-600 transition-colors"
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