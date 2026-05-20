"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // FETCH CARS
  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/car");
      const data = await res.json();

      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // SEARCH + FILTER
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchSearch = car?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchType = type ? car?.type === type : true;

      return matchSearch && matchType;
    });
  }, [cars, search, type]);

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-[#1E3C5C]">
          Loading cars...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#1E3C5C]">
          Explore Cars
        </h1>
        <p className="text-gray-600 mt-2">
          Find your perfect rental car
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search car name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl bg-white text-black"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl bg-white text-black"
        >
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>

      {/* CAR GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredCars.map((car, index) => {
          const isAvailable =
            car?.availability === true ||
            car?.availability === "true";

          return (
            <div
              key={car?._id || index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border"
            >

              {/* IMAGE */}
              <img
                src={car?.image}
                alt={car?.name}
                className="h-56 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-xl font-bold text-[#1E3C5C]">
                  {car?.name}
                </h2>

                <p className="text-gray-600">
                  Type: {car?.type}
                </p>

                <p className="text-gray-600">
                  Location: {car?.location}
                </p>


                {/* AVAILABILITY */}
                <p
                  className={`mt-2 font-medium ${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isAvailable ? "Available" : "Not Available"}
                </p>

                {/* VIEW DETAILS */}
                <Link href={`/car/${car?._id}`}>
                  <button className="w-full mt-3 py-2 bg-blue-700 text-white rounded hover:opacity-90 transition">
                    View Details
                  </button>
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}