/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import mock from "/mock.jpg";

const NearestParkingCard = ({ spot }) => {
  return (
    <Link to={`/spots/${spot._id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden pb-4">
        {spot.imageUrls.length > 0 ? (
          <img className="w-full h-48 object-cover object-center mb-1" src={spot.imageUrls[0]} alt={spot.name} />
        ) : (
          <img className="w-full h-48 object-cover object-center mb-1" src={mock} alt={spot.name} />
        )}

        {spot.available ? (
          <p className="px-4 py-1 bg-green-600 text-white rounded-sm">Available</p>
        ) : (
          <p className="px-4 py-1 bg-red-600 text-white rounded-sm">Unavailable</p>
        )}

        <div className="flex items-center justify-between p-2">
          <div className="">
            <h2 className="text-xl font-semibold text-black">{spot.name}</h2>
            <p className="text-sm text-gray-800">{spot.location}</p>
          </div>

          <div className="">
            <p>{spot.distance} KM</p>
            <p className="">{spot.spotType}</p>
            <p className="text-green-700"> Rs.{spot.pricePerHour} / hr</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-2 p-2">
          {spot.features.map((feature, index) => (
            <span key={index} className="bg-blue-500 rounded-lg px-4 py-1 text-sm">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default NearestParkingCard;
