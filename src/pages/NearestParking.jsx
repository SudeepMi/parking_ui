import { useEffect, useState } from "react";
import ParkingSpotCard from "../components/ParkingSpotCard";
import { privateAxios } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function NearestParking() {
  const [spots, setSpots] = useState([]);

  const getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(s, () => {}, {
        enableHighAccuracy: true,
      });
    }
  };
  const s = (d) => {
    const { latitude, longitude } = d.coords;
    privateAxios
      .get("/parkings/knn?cords=" + latitude + "," + longitude)
      .then((res) => setSpots(res.data));
  };

  useEffect(() => {
    getCoords();
  }, []);

  return (
    <div>
     <div className="title flex justify-center  ">
     <h2 className="text-black border border-purple-600 bg-purple-200  text-2xl bold  font-semibold font-serif text-center  shadow-md my-10 p-5 rounded-md">
        Parking Spots Near You
      </h2>
     </div>
      <div className="flex flex-wrap gap-8 justify-center  mt-2 p-2">
        {console.log(spots)}
        {spots ? (
          spots.map((s) => s && <ParkingSpotCard key={s._id} spot={s} />)
        ) : (
          <p>No spots available.</p>
        )}
      </div>
    </div>
  );
}
