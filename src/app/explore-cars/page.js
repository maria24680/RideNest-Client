"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/car`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(err.message || "Failed to load cars. Please try again.");
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Derive unique car types dynamically from the fetched data
  const carTypes = useMemo(() => {
    const types = cars
      .map((car) => car?.type)
      .filter(Boolean);
    return [...new Set(types)].sort();
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchSearch = car?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchType = type ? car?.type === type : true;
      return matchSearch && matchType;
    });
  }, [cars, search, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-[#1E3C5C] animate-pulse">
          Loading cars...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <p className="text-xl font-semibold text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#1E3C5C] text-white rounded-lg hover:bg-[#16324d] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#1E3C5C]">Explore Cars</h1>
        <p className="text-gray-600 mt-2">Find your perfect rental car</p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search car name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 w-full p-3 border border-gray-300 rounded-xl bg-white text-black"
        />

        <div className="w-full sm:w-full md:w-56">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black text-sm sm:text-base"
          >
            <option value="">All Types</option>
            {carTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Car Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCars.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
            <p className="text-2xl font-semibold text-gray-400">No cars found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter criteria.
            </p>
            
          </div>
        ) : (
          filteredCars.map((car) => {
            const isAvailable =
              car?.availability === true || car?.availability === "true";

            return (
              <div
                key={car?._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              >
                <img
                  src={car?.image || "https://placehold.co/600x400?text=No+Image"}
                  alt={car?.name || "Car"}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold text-[#1E3C5C]">
                    {car?.name || "Unknown Car"}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Type: {car?.type || "N/A"}
                  </p>

                  <p className="text-gray-600">
                    Location: {car?.location || "N/A"}
                  </p>

                  {car?.price != null && (
                    <p className="text-gray-800 font-semibold mt-1">
                      ${car.price} / day
                    </p>
                  )}

                  <p
                    className={`mt-2 font-medium ${
                      isAvailable ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {isAvailable ? "Available" : "Not Available"}
                  </p>

                  <Link
                    href={`/car/${car?._id}`}
                    className="block w-full mt-4 py-2 bg-[#1E3C5C] text-white rounded-lg hover:bg-[#16324d] transition-colors font-medium text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}