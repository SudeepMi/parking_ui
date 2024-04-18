/* eslint-disable react/prop-types */

import { FaCreativeCommonsRemix, FaDollarSign, FaHammer, FaSpaceShuttle } from "react-icons/fa";
import ReservationModal from "./modals/ReservationModal";

import Card from "./Card";
import mock from "/mock.jpg";
import { useContext } from "react";
import { TokensContext } from "../hooks/useTokens";
import FeedbackForm from "./modals/feedback";
import RatingForm from "./modals/rating";
import { useNavigate } from "react-router-dom";
import ParkingMap from "./Map/parkingMap";


const ParkingPlaceDetails = ({ spot }) => {
  const { accessToken } = useContext(TokensContext);
  const navigate = useNavigate()
  console.log(spot)

  return (
    <div className="w-full overflow-hidden space-y-6">
      {spot.available ? (
        <div className="flex items-center gap-4 px-4 py-2 bg-green-600">
          <FaCreativeCommonsRemix className="h-8 w-8" />
          <p className="text-xl text-white rounded-sm">Available</p>
        </div>
      ) : (
        <div className="flex items-center gap-4 px-4 py-2 bg-red-600">
          <FaSpaceShuttle className="h-8 w-8" />
          <p className="text-xl text-white rounded-sm">Unavailable</p>
        </div>
      )}

      <div className="image-map grid sm:grid-cols-[1fr_1fr] gap-5">
      {spot.imageUrls.length > 0 ? (
        <img className="w-full grid h-96 object-cover object-center mb-1 rounded-md shadow-md"  src={spot.imageUrls[0]} alt={spot.name} />
        
      ) : (
        <img className="w-full h-96 object-cover object-center mb-1" src={mock} alt={spot.name} />
      )}


    <ParkingMap className="rounded-md overflow-hidden object-contain" spot={spot.coordinates} id={spot._id} name={spot.name} />


      </div>




      <div className="grid sm:grid-cols-2 gap-10">
        <div className="">
          <h2 className="text-2xl">{spot.name}</h2>
          <p className="text-base text-gray-800">{spot.location}</p>
          <p className="mt-2 text-gray-500">{spot.description}</p>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex items-center text-green-500">
            {/* <FaDollarSign className="h-8 w-8" /> */}
            <h3 className="text-3xl text-black ">Rs.</h3>
            <p className="text-4xl font-semibold">{spot.pricePerHour}</p>
          </div>
          <div className="flex items-center gap-4">
            {spot.features.map((feature, index) => (
              <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs mr-2 mb-2">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 my-10">
        <div className="flex flex-col space-y-4  rounded-lg  ">
          <h2 className="text-2xl font-semibold">Total Capacity</h2>
          <Card vehicleType="car" total={spot.capacity.car} />
          <Card vehicleType="bike" total={spot.capacity.bike} />
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold">Total Reservations</h2>
          <Card vehicleType="car" total={spot.reservations.car.length} />
          <Card vehicleType="bike" total={spot.reservations.bike.length} />
        </div>
      </div>
      <p>Cars</p>
      <div className="sport_card grid grid-cols-[repeat(auto-fit,minmax(0,150px))] gap-5 px-2 py-2 rounded-md ">
            {[...Array(spot.capacity.car).keys()].map((v,k)=>{
            return <div className={`car_spot  rounded-md flex flex-col px-2 py-3 w-full ${spot.reservations.car.filter(res=>res.slot_id==`SLOT-${k+1}`).length>0 ? "pack bg-red-800" :"bg-green-600"} `} key={k}>
              <p className=" text-center py-1 ">{`SLOT-${k+1}`}</p>
              {spot.reservations.car.filter(res=>res.slot_id==`SLOT-${k+1}`).length<=0 && <ReservationModal id={spot._id} spot={`SLOT-${k+1}`} /> }
              </div>})}
      </div>

      <p>Bikes</p>
      <div className="sport_card grid grid-cols-[repeat(auto-fit,minmax(0,150px))] gap-5 px-2 py-2 rounded-md">
            {[...Array(spot.capacity.bike).keys()].map((v,k)=>{
            return <div className={` car_spot  rounded-md flex flex-col px-2 py-3 w-full ${spot.reservations.bike.filter(res=>res.slot_id==`SLOT-${k+1}`).length>0 ? "pack bg-red-800" :"bg-green-600"}  `} key={k}>
              <p className=" text-center py-1 ">{`SLOT-${k+1}`}</p>
              {spot.reservations.bike.filter(res=>res.slot_id==`SLOT-${k+1}`).length<=0 && <ReservationModal id={spot._id} spot={`SLOT-${k+1}`} /> }
              </div>})}
      </div>

      {!accessToken ? (
        <div className="flex items-center gap-4 px-4 py-2 bg-yellow-600 cursor-pointer" onClick={()=> navigate('/signin')  }> 
          <FaHammer className="h-8 w-8" />
          <p className="text-xl text-white rounded-sm">Please sign in first</p>
        </div>
      ) : (
        <>{spot.available && <ReservationModal id={spot._id} />}</>
      )}


      <div className="feedback rating grid sm:grid-cols-[1fr_1fr] gap-8 overflow-hidden">
        <RatingForm/>
        <FeedbackForm/>
      </div>

    </div>
  );
};

export default ParkingPlaceDetails;
