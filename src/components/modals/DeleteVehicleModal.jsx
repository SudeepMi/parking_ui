import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

import { privateAxios } from "../../api";
import { FaTrash } from "react-icons/fa";

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

// eslint-disable-next-line react/prop-types
const DeleteVehicleModal = ({ id }) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { mutate } = useMutation({
    mutationFn: () => {
      return privateAxios.delete(`/vehicles/${id}`);
    },
    onSuccess: () => {
      closeModal();
      toast.success("Vehicle deleted successfully");
      queryClient.invalidateQueries("vehicles");
    },
    onError: (err) => {
      toast.error("Error while deleting vehicle");
      console.log("error while deleting vehicle", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();

    closeModal();
  };

  return (
    <>
      <div onClick={openModal} className="absolute top-2 right-2 p-2 bg-red-600 rounded-full">
        <FaTrash className="w-4 h-4" />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} {...overlayTransitionConfig}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} {...dialogTransitionConfig}>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 ">
                    Are you sure you want to delete this vehicle?
                  </Dialog.Title>
                  <div className="flex items-center justify-between pt-10 gap-10">
                    <button
                      type="button"
                      className="w-full bg-zinc-700 py-2 rounded-md hover:bg-zinc-800 transition-all ease-in-out"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-full bg-rose-600 py-2 rounded-md hover:bg-rose-700 transition-all ease-in-out"
                      onClick={handleSubmit}
                    >
                      Continue
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteVehicleModal;
