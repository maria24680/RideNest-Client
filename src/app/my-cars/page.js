"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // UPDATE MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAvailability, setUpdatedAvailability] = useState(true);
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");

  // DELETE MODAL STATES
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // FETCH CARS
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/car");
        const data = await res.json();

        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cars:", error);

        toast.error("Failed to load cars ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // OPEN UPDATE MODAL
  const openUpdateModal = (car) => {
    setSelectedCar(car);
    setUpdatedPrice(car.pricePerDay);
    setUpdatedDescription(car.description);
     setUpdatedAvailability(car.availability);
       setUpdatedImage(car.image);
         setUpdatedType(car.type);
    setUpdatedLocation(car.location);
    
    setShowModal(true);
  };

  // UPDATE CAR
  const handleUpdate = async () => {
    if (!selectedCar?._id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/car/${selectedCar._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            pricePerDay: updatedPrice,
            location: updatedLocation,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setCars((prevCars) =>
          prevCars.map((c) =>
            c._id === selectedCar._id
              ? {
                  ...c,
                  pricePerDay: updatedPrice,
                  location: updatedLocation,
                }
              : c
          )
        );

        setShowModal(false);

        toast.success("Car updated successfully ✅");
      }
    } catch (error) {
      console.error("Error updating car:", error);

      toast.error("Update failed ❌");
    }
  };

  // DELETE CAR
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/car/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setCars((prev) =>
          prev.filter((c) => c._id !== deleteId)
        );

        setDeleteModal(false);

        toast.success("Car deleted successfully ✅");
      }
    } catch (error) {
      console.error("Error deleting car:", error);

      toast.error("Delete failed ❌");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-600">
        Loading cars...
      </div>
    );
  }

  return (
    <>
      {/* TOASTIFY */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div className="min-h-screen bg-gray-100 p-6">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-[#1E3C5C] mb-8">
          My Added Cars
        </h1>

        {/* EMPTY */}
        {cars.length === 0 ? (
          <div className="text-center text-gray-600 font-medium">
            No cars found
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            
            {cars.map((car, index) => (
              <div
                key={car?._id || index}
                className="bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                
                {/* IMAGE */}
                <img
                  src={
                    car?.image ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={car?.name || "Car"}
                  className="h-48 w-full object-cover rounded"
                />

                {/* DETAILS */}
                <h2 className="text-xl font-bold mt-3 text-gray-800">
                  {car?.name || "Unknown Car"}
                </h2>

                <p className="text-gray-700 mt-1">
                  Price: ৳{car?.pricePerDay || "N/A"}
                </p>

                <p className="text-gray-700">
                  Location: {car?.location || "N/A"}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-4">
                  
                  <button
                    onClick={() => openUpdateModal(car)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(car?._id);
                      setDeleteModal(true);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
              
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Update Car
              </h2>

              <div className="space-y-4">
                
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) =>
                    setUpdatedPrice(e.target.value)
                  }
                  placeholder="Price Per Day"
                  className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                 value={updatedDescription}
                 onChange={(e) =>
                 setUpdatedDescription(e.target.value)
                          }
                placeholder="Description"
                rows={4}
                 className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <select
  value={updatedAvailability}
  onChange={(e) =>
    setUpdatedAvailability(e.target.value === "true")
  }
  className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="true">Available</option>
  <option value="false">Not Available</option>
</select>

<input
  type="text"
  value={updatedImage}
  onChange={(e) => setUpdatedImage(e.target.value)}
  placeholder="Image URL"
  className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
/>

                  <input
                   type="text"
                   value={updatedType}
                   onChange={(e) => setUpdatedType(e.target.value)}
                  placeholder="Type"
                  className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  


                <input
                  type="text"
                  value={updatedLocation}
                  onChange={(e) =>
                    setUpdatedLocation(e.target.value)
                  }
                  placeholder="Location"
                  className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">
                
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>

              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Delete Car
              </h2>

              <p className="text-gray-600">
                Are you sure you want to delete this car?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}