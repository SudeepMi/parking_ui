import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import { privateAxios } from "../api";
import StopParkingModal from "../components/modals/StopParkingModal";
import PaymentModal from "../components/modals/PaymentModal";
import Loading from "../components/Loading";
import UpdatePaymentModal from "../components/modals/UpdatePaymentModal";
import React from "react";

const Parking = () => {

  const [parkings, setParkings] = React.useState([])
  const [isLoading, setIL] = React.useState(true)
  const fetchProfile = async () => {
    try {
      const res = await privateAxios.get("/parkings/u/p");
      setParkings(res.data.parkings);
      setIL(false)
    } catch (error) {
      console.log("Error while fetching profile", error);
      throw error;
    }
  };
  React.useEffect(()=>{fetchProfile()},[]);





  if (isLoading) {
    return <Loading />;
  }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  return (
    <div className="my-10 w-11/12 mx-auto">
      {parkings.length === 0 ? (
        <p>No parking entries found.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {console.log(parkings)}
          {parkings.map((entry) => (
            <div key={entry._id}>
              <div className="relative bg-zinc-800 rounded-lg shadow-lg p-6 mb-4 h-72">
                <h3 className="font-semibold mb-2">Parking ID: {entry._id}</h3>

                {entry.status === "Payment Pending" ? (
                  <p className="text-yellow-600">Payment Pending</p>
                ) : entry.status === "Exited" ? (
                  <p className="text-red-600">Exited</p>
                ) : (
                  <p className="text-green-600">Parking</p>
                )}
                {entry.startTime ? moment(entry.startTime).format("Y-M-D, h:mm a") : "N/A"}
                {entry.status !== "Parked" && (
                  <>
                    <p>{entry.endTime ? moment(entry.endTime).format("Y-M-D, h:mm a") : "N/A"}</p>
                    <p>Total Amount: NPR {entry.totalCost.toFixed(2)}</p>
                    {entry?.status !== "Confirmed" ? (
                     
                        
                          <>
                            <p>Payment status: {"Not Paid"}</p>
                            <p>Remaining Payment: NPR{entry.totalCost.toFixed(2)}</p>
                          </>
                        
                     
                    ) : (
                      <p className="text-green-400">Paid</p>
                    )}
                  </>
                )}

                {entry.status === "Parked" ? (
                  <StopParkingModal id={entry._id} />
                ) : entry.status === "Payment Pending" ? (
                  entry?.payment?.remainingAmount ? (
                    <UpdatePaymentModal id={entry._id} totalAmount={entry.payment.remainingAmount} />
                  ) : (
                    <PaymentModal id={entry._id} totalAmount={entry.totalAmount} />
                  )
                ) : (
                  <div className="w-full absolute bottom-0 left-0 px-4 text-gray-400 my-4 cursor-pointer rounded-full">
                    <p className="bg-red-600 hover:bg-red-700 text-white text-center px-4 py-2 rounded-md">
                      Delete Parking
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Parking;
