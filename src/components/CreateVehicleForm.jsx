import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { privateAxios } from "../api";

const CreateVehicleForm = () => {
  const [formData, setFormData] = useState({
    model: "",
    licensePlate: "",
    vehicleType: "car",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { isLoading, error, mutate } = useMutation({
    mutationFn: (data) => {
      return privateAxios.post("/vehicles", data);
    },
    onSuccess: () => {
      navigate("/vehicles");
    },
    onError: (err) => {
      console.log("error while creating vehicle", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <section className="flex items-center mt-6 justify-center w-full bg-zinc-900 text-white">
      <form className="flex flex-col w-11/12 sm:w-1/3 space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="model">Model</label>
        <input
          type="text"
          name="model"
          id="model"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.model}
          onChange={handleChange}
        />

        <label htmlFor="licensePlate">License Plate</label>
        <input
          type="text"
          name="licensePlate"
          id="licensePlate"
          required
          className="border bg-transparent py-2 rounded-md px-2"
          value={formData.licensePlate}
          onChange={handleChange}
        />

        <label htmlFor="vehicleType">Vehicle Type</label>
        <select
          name="vehicleType"
          id="vehicleType"
          required
          className="border bg-zinc-900 py-2 rounded-md px-2"
          value={formData.vehicleType}
          onChange={handleChange}
        >
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>

        {error && <p className="text-red-500 ml-auto">{error}</p>}

        <button disabled={isLoading} type="submit" className="px-4 py-2 bg-purple-500 hover:bg-purple-700">
          Create Vehicle
        </button>
      </form>
    </section>
  );
};

export default CreateVehicleForm;
