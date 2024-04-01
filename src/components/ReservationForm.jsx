import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";

import { privateAxios } from "../api";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const ReservationForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    parkingSpotId: id,
    vehicleId: "",
    startTime: null,
    endTime: null,
    arrivalTime: null,
  });

  const fetchVehicle = async () => {
    try {
      const res = await privateAxios.get(`vehicles/u/p`);
      return res.data.vehicles;
    } catch (error) {
      console.log("error while fetching vehicles", error);
    }
  };

  const { data: vehicles, isLoading, isError, error } = useQuery(["vehicles"], fetchVehicle);

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleVehicleChange = (selectedOption) => {
    setFormData({
      ...formData,
      vehicleId: selectedOption.value,
    });
  };

  const {
    isLoading: isMutateLoading,
    error: mutateError,
    mutate,
  } = useMutation({
    mutationFn: (data) => {
      return privateAxios.post("/reservations", data);
    },
    onSuccess: () => {
      //   navigate("/vehicles");c
      console.log("Successfully");
    },
    onError: (err) => {
      console.log("error while creating vehicle", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  let vehicleOptions;
  if (vehicles) {
    vehicleOptions = vehicles.map((vehicle) => ({
      value: vehicle._id,
      label: vehicle.model,
    }));
  }

  if (isLoading || isMutateLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (mutateError) {
    return <span>Error: {mutateError.message}</span>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl bg-neutral-800 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block">Select Vehicle:</label>
        <Select
          options={vehicleOptions}
          value={vehicleOptions.find((option) => option.value === formData.vehicleId)}
          onChange={handleVehicleChange}
          className="w-52 rounded-lg bg-white text-black "
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "hotpink",
            },
          })}
        />
      </div>
      <div className="mb-4">
        <label className="block">Start Time:</label>
        <DatePicker
          selected={formData.startTime}
          onChange={(date) => handleDateChange(date, "startTime")}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          className="w-full p-2 border text-black border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block">End Time:</label>
        <DatePicker
          selected={formData.endTime}
          onChange={(date) => handleDateChange(date, "endTime")}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          className="w-full p-2 border text-black border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block">Arrival Time:</label>
        <DatePicker
          selected={formData.arrivalTime}
          onChange={(date) => handleDateChange(date, "arrivalTime")}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          className="w-full p-2 border text-black border-gray-300 rounded-lg"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Submit Reservation
      </button>
    </form>
  );
};

export default ReservationForm;
