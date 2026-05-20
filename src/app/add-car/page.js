"use client";

const AddCarPage = () => {

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const car = Object.fromEntries(formData.entries());

    console.log(car);

    const res = await fetch("http://localhost:5000/car", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(car),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        <h1 className="text-3xl font-bold text-[#1E3C5C] mb-6">
          Add New Car
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Car Name"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="pricePerDay"
            placeholder="Daily Rent Price"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="type"
            placeholder="Car Type (SUV / Sedan / Luxury)"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="image"
            placeholder="Image URL"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="seats"
            type="number"
            placeholder="Seat Capacity"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <input
            name="location"
            placeholder="Pickup Location"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="2"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
          />

          <select
            name="availability"
            className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white"
          >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

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
};

export default AddCarPage;