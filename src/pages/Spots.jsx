import { useQuery } from "@tanstack/react-query";

import { privateAxios } from "../api";
import Loading from "../components/Loading";
import ParkingSpotCard from "../components/ParkingSpotCard";

const Spots = () => {
  const fetchSpots = async () => {
    try {
      const res = await privateAxios.get("/spots");
      return res.data.spots;
    } catch (error) {
      console.log("error while fetching spots", error);
      throw error;
    }
  };

  const { data: spots, isLoading, isError, error } = useQuery(["spots"], fetchSpots);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="grid md:grid-cols-3 w-11/12 mx-auto gap-6 my-10">
      {spots ? spots.map((s) => <ParkingSpotCard key={s._id} spot={s} />) : <p>No spots available.</p>}
    </div>
  );
};

export default Spots;
