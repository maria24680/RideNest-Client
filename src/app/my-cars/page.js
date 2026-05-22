"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function MyCars() {
  const { data: session } = authClient.useSession();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [availability, setAvailability] = useState(true);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  // 🔐 FETCH MY CARS (PRIVATE FILTER BY EMAIL)
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchCars = async () => {
      try {
        setLoading(true);

        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/car?email=${session?.user?.email}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          }
        );

        const data = await res.json();

        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [session]);

  // 🔥 OPEN UPDATE MODAL
  const openUpdate = (car) => {
    setSelectedCar(car);
    setPrice(car.pricePerDay);
    setLocation(car.location);
    setDescription(car.description || "");
    setImage(car.image || "");
    setType(car.type || "");
    setAvailability(car.availability);

    setShowModal(true);
  };

  // 🔥 UPDATE CAR (PRIVATE)
  const handleUpdate = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/car/${selectedCar._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            pricePerDay: price,
            location,
            description,
            image,
            type,
            availability,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setCars((prev) =>
          prev.map((c) =>
            c._id === selectedCar._id
              ? { ...c, pricePerDay: price, location }
              : c
          )
        );

        toast.success("Updated successfully");
        setShowModal(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // 🗑 DELETE CAR (PRIVATE)
  const handleDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/car/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setCars((prev) =>
          prev.filter((c) => c._id !== deleteId)
        );

        toast.success("Deleted successfully");
        setDeleteModal(false);
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-center mb-8">
        My Cars
      </h1>

      {cars.length === 0 ? (
        <p className="text-center">No cars found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white p-4 rounded shadow"
            >
              <Image
              alt="car image"
              height={400}
              width={400}
                src={car.image}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-bold mt-2">
                {car.name}
              </h2>

              <p>৳ {car.pricePerDay}</p>
              <p>{car.location}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openUpdate(car)}
                  className="bg-blue-900 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setDeleteId(car._id);
                    setDeleteModal(true);
                  }}
                  className="bg-red-400 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {/* UPDATE MODAL */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">

    <div className="bg-white w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl p-5 text-black max-h-[90vh] overflow-y-auto">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-center text-[#1E3C5C] mb-5">
        Update Car
      </h2>

      {/* PRICE */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1 text-[#1E3C5C]">
          Price Per Day
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-[#2A6F8F]/30"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1 text-[#1E3C5C]">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description..."
          rows="3"
          className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-[#2A6F8F]/30 resize-none"
        />
      </div>

      {/* AVAILABILITY */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1 text-[#1E3C5C]">
          Availability
        </label>

        <select
          value={availability}
          onChange={(e) =>
            setAvailability(e.target.value === "true")
          }
          className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-[#2A6F8F]/30"
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>

      {/* IMAGE */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1 text-[#1E3C5C]">
          Image URL
        </label>

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-[#2A6F8F]/30"
        />
      </div>

      {/* TYPE */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1 text-[#1E3C5C]">
          Car Type
        </label>

        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="SUV / Sedan"
          className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-[#2A6F8F]/30"
        />
      </div>

      {/* LOCATION */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1 text-[#1E3C5C]">
          Location
        </label>

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-[#2A6F8F]/30"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 sticky bottom-0 bg-white pt-2">

        <button
          onClick={() => setShowModal(false)}
          className="w-1/2 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-semibold"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="w-1/2 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] hover:opacity-90 transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  </div>
)}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded">
            <p>Are you sure?</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-red-400 px-3 py-1 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-400 text-white px-3 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}