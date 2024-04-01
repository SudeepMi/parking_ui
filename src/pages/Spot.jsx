import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { privateAxios } from "../api";
import Loading from "../components/Loading";
import ParkingPlaceDetails from "../components/ParkingPlaceDetails";

const Spots = () => {
  const { id } = useParams();

  const fetchSpots = async () => {
    try {
      const res = await privateAxios.get(`/spots/${id}`);
      return res.data.spot;
    } catch (error) {
      console.log("error while fetching spots", error);
    }
  };

  const { data: spot, isLoading, isError, error } = useQuery(["spot"], fetchSpots);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <ParkingPlaceDetails spot={spot} />
    </div>
  );
};

export default Spots;
