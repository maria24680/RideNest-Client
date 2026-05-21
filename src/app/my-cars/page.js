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
          `http://localhost:5000/car?email=${session?.user?.email}`,
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
        `http://localhost:5000/car/${selectedCar._id}`,
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
        `http://localhost:5000/car/${deleteId}`,
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
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setDeleteId(car._id);
                    setDeleteModal(true);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-[400px]">
            <h2 className="text-xl font-bold mb-3">
              Update Car
            </h2>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="border p-2 w-full mb-2"
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="border p-2 w-full mb-2"
            />

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Description"
              className="border p-2 w-full mb-2"
            />

            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image"
              className="border p-2 w-full mb-2"
            />

            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
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
                className="bg-gray-400 px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
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