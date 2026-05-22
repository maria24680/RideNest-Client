
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
 process.env.NEXT_PUBLIC_SERVER_URL;

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

        const res = await fetch(
          `${API_BASE_URL}/car?search=${search}&type=${type}`
        );

        if (!res.ok) throw new Error("Failed to fetch cars");

        const data = await res.json();
        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [search, type]);

  const carTypes = useMemo(() => {
    const types = cars.map((car) => car?.type).filter(Boolean);
    return [...new Set(types)].sort();
  }, [cars]);

 if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 animate-pulse">
      
      <div className="w-14 h-14 border-4 border-[#1E3C5C] border-t-transparent rounded-full animate-spin"></div>

      <p className="text-xl font-semibold text-[#1E3C5C]">
        Loading cars...
      </p>
    </div>
  );
}
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#1E3C5C] text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">
      <h1 className="text-4xl font-bold text-center text-[#1E3C5C]">
        Explore Cars
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mt-8 mb-8">
        <input
          type="text"
          placeholder="Search car name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-xl text-black"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full md:w-56 p-3 border rounded-xl text-black"
        >
          <option value="">All Types</option>
          {carTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.length === 0 ? (
          <p className="col-span-3 text-center text-gray-400">
            No cars found
          </p>
        ) : (
          cars.map((car) => {
            const isAvailable =
              car?.availability === true || car?.availability === "true";

            return (
              <div
                key={car._id}
                className="bg-white rounded-xl shadow border overflow-hidden"
              >
                <Image
                alt="car image"
                height={400}
                width={400}
                  src={
                    car.image || "https://placehold.co/600x400?text=No+Image"
                  }
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

                  <Link
                    href={`/car/${car._id}`}
                    className="block mt-4 text-center bg-[#1E3C5C] text-white py-2 rounded-lg"
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