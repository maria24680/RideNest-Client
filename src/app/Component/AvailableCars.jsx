"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AvailableCars() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {

  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car?limit=6`)
    .then((res) => res.json())
    .then((data) => {

      setCars(data);

      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });

}, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Loading Cars...
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#f4f9fc]">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-12">

          <h2 className="text-4xl font-extrabold text-[#1E3C5C]">
            Available Cars
          </h2>

          <p className="text-gray-600 mt-3">
            Choose your dream car for your next journey
          </p>

        </div>

        {/* CAR GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {cars.map((car) => (

            <div
                            key={car?._id}
                            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
                          >
                            <Image
                            width={400}
                            height={400}
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
            
                              
            
                            <Link
                                href={`/car/${car?._id}`}
                                className="block w-full mt-4 py-2 bg-[#1E3C5C] text-white rounded-lg hover:bg-[#16324d] transition-colors font-medium text-center"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>

          ))}

        </div>

      </div>

    </section>
  );
}