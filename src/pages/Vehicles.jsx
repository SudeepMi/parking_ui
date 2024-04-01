/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";

import { privateAxios } from "../api";
import Loading from "../components/Loading";
import VehicleRegisterModal from "../components/modals/VehicleRegisterModal";
import DeleteVehicleModal from "../components/modals/DeleteVehicleModal";

const Vehicles = () => {
  const fetchVehicle = async () => {
    try {
      const res = await privateAxios.get(`vehicles/u/p`);
      return res.data.vehicles;
    } catch (error) {
      console.log("Error while fetching vehicles", error);
      throw error; // Re-throw the error so React Query handles it
    }
  };

  const { data: vehicles, isLoading, isError, error } = useQuery(["vehicles"], fetchVehicle);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-11/12 mx-auto my-6">
      <div className="grid sm:grid-cols-4 gap-10">
        {vehicles.map((v) => (
          <Vehicle key={v._id} id={v._id} model={v.model} licensePlate={v.licensePlate} vehicleType={v.vehicleType} />
        ))}
      </div>

      <VehicleRegisterModal />
    </div>
  );
};

function Vehicle({ model, licensePlate, vehicleType, id }) {
  const IconMap = {
    car: <FaCarSide className="h-20 w-20" />,
    bike: <RiMotorbikeFill className="h-20 w-20" />,
  };

  const fetchReservations = async () => {
    try {
      const res = await privateAxios.get("/reservations"); // Adjust the API endpoint as needed
      return res.data.reservations;
    } catch (error) {
      console.log("Error while fetching reservations", error);
      throw error;
    }
  };

  const { data: reservations, isError, error, isLoading } = useQuery(["reservations"], fetchReservations);

  if (isLoading) {
    return (
      <div className="relative p-1 border px-4 h-36 overflow-hidden border-purple-600 rounded-md  transition-all"></div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const vehicleNotInReservations =
    !reservations || !reservations.some((reservation) => reservation?.vehicle?._id === id);

  return (
    <div className="relative p-1 border px-4 overflow-hidden border-purple-400 rounded-md cursor-pointer hover:border-purple-800 transition-all">
      {IconMap[vehicleType]}
      <h2 className="text-xl text-green-600">{model}</h2>
      <p className="text-base w-14 text-black bg-gray-400  text-center">{licensePlate}</p>
      {vehicleNotInReservations && <DeleteVehicleModal id={id} />}
    </div>
  );
}

export default Vehicles;
