"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function CarDetails() {
  const { id } = useParams();

  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [openModal, setOpenModal] =
    useState(false);

  const [car, setCar] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [driverNeeded, setDriverNeeded] =
    useState(false);

  const [note, setNote] = useState("");

  const [bookingLoading, setBookingLoading] =
    useState(false);

  // FETCH CAR
  useEffect(() => {
    // WAIT FOR SESSION
    if (isPending) return;

    // USER NOT LOGGED IN
    if (!session) {
      toast.error("Please login first");

      router.push("/login");

      return;
    }

    if (!id) return;

    const fetchCar = async () => {
      try {
        setLoading(true);

        // GET TOKEN
        const { data } =
          await authClient.token();

        const token = data?.token;

        if (!token) {
          throw new Error(
            "No token found"
          );
        }

        console.log("TOKEN:", token);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/car/${id}`,
          {
            method: "GET",

            headers: {
              "Content-Type":
                "application/json",

              authorization: `Bearer ${token}`,
            },
          }
        );

        const result =
          await res.json();

        console.log(result);

        if (!res.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch car"
          );
        }

        setCar(result);
      } catch (error) {
        console.log(error);

        toast.error(
          error.message ||
            "Failed to load car details"
        );

        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [
    id,
    session,
    isPending,
    router,
  ]);

  // BOOKING
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setBookingLoading(true);

      const { data } =
        await authClient.token();

      const token = data?.token;

      const res = await fetch(
        "${process.env.NEXT_PUBLIC_SERVER_URL}/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            carId: car?._id,

            carName: car?.name,

            pricePerDay:
              car?.pricePerDay,

            driverNeeded,

            note,

            bookingDate:
              new Date(),

            userEmail:
              session?.user?.email,
          }),
        }
      );

      const result =
        await res.json();

      if (res.ok) {
        toast.success(
          "Booking Successful"
        );

        setDriverNeeded(false);

        setNote("");

        setOpenModal(false);

        setTimeout(() => {
          router.push(
            "/my-bookings"
          );
        }, 1500);
      } else {
        toast.error(
          result?.message ||
            "Booking Failed"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // SESSION LOADING
  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // CAR NOT FOUND
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Car not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow overflow-hidden">

        <Image
          width={800}
          height={500}
          src={
            car?.image ||
            "https://placehold.co/800x500"
          }
          alt={car?.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1E3C5C]">
            {car?.name}
          </h1>

          <p className="mt-2 text-gray-700">
            Type: {car?.type}
          </p>

          <p className="text-gray-700">
            Seats: {car?.seats}
          </p>

          <p className="text-gray-700">
            Location: {car?.location}
          </p>

          <p className="text-gray-700">
            Price: ৳
            {car?.pricePerDay}/day
          </p>

          <p
            className={`mt-2 font-medium ${
              car?.availability
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {car?.availability
              ? "Available"
              : "Not Available"}
          </p>

          <p className="mt-4 text-gray-600">
            {car?.description}
          </p>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="w-full mt-6 py-3 rounded-xl bg-[#1E3C5C] text-white font-semibold hover:bg-blue-900 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-[#1E3C5C]">
                Book This Car
              </h2>

              <button
                onClick={() =>
                  setOpenModal(false)
                }
                className="text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleBooking}
              className="p-5 space-y-4"
            >

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Driver Needed
                </label>

                <select
                  value={driverNeeded}
                  onChange={(e) =>
                    setDriverNeeded(
                      e.target.value ===
                        "true"
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
                >
                  <option value="false">
                    No
                  </option>

                  <option value="true">
                    Yes
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Special Note
                </label>

                <textarea
                  value={note}
                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
                />
              </div>

              <button
                type="submit"
                disabled={
                  bookingLoading
                }
                className="w-full py-3 rounded-xl bg-[#1E3C5C] text-white font-semibold hover:bg-blue-800 transition disabled:opacity-50"
              >
                {bookingLoading
                  ? "Booking..."
                  : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}