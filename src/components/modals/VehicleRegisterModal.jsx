import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

import { privateAxios } from "../../api";

const dialogTransitionConfig = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};

const overlayTransitionConfig = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

const VehicleRegisterModal = () => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    model: "",
    licensePlate: "",
    vehicleType: "car",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { isLoading, error, mutate } = useMutation({
    mutationFn: (data) => {
      return privateAxios.post("/vehicles", data);
    },
    onSuccess: () => {
      closeModal();

      toast.success("Vehicle registered successfully");
      queryClient.invalidateQueries("vehicles");
    },
    onError: (err) => {
      // toast.error("License number is already registered");
      console.log("error while creating vehicle", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 rounded-md  bg-green-600 hover:bg-green-700 transition-all ease-in-out mt-4"
      >
        Register Vehicle
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} {...overlayTransitionConfig}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} {...dialogTransitionConfig}>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
                      className="bg-zinc-900 border py-2 rounded-md px-2"
                      value={formData.vehicleType}
                      onChange={handleChange}
                    >
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                    </select>

                    {error && <p className="text-red-500 ml-auto text-base">License number is already registered</p>}

                    <button
                      disabled={isLoading}
                      type="submit"
                      className="px-4 py-2 border border-transparent bg-purple-600  text-sm font-medium  hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Create Vehicle
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default VehicleRegisterModal;
