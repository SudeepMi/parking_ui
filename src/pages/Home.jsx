import { useContext, useEffect, useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TokensContext } from "../hooks/useTokens";
import { privateAxios } from "../api";
import ParkingSpotCard from "../components/ParkingSpotCard";

const Home = () => {
  const { accessToken } = useContext(TokensContext);
  // const [spots, setSpots] = useState([])

  // const getCoords = ()=>{
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(s,()=>{},{enableHighAccuracy: true});
  //   }
  // }
  // const s =(d)=>{
  //   const {latitude, longitude} = d.coords;
  //   privateAxios.get("/parkings/knn?cords="+latitude+","+longitude).then(res=>setSpots(res.data))
  // }
  // useEffect(()=>{
  //   getCoords()
  // },[])
  return (
    <div>
      {!accessToken && (
        <div className="w-full flex items-center gap-4 bg-yellow-600 py-2 px-4 sm:px-14">
          <FaCashRegister className="h-6 w-6" />
          <p>Opps Youre not logged in</p>
        </div>
      )}
      <div className="min-h-[80vh] flex flex-col justify-center items-center ">
        <div className="text-black text-4xl mb-6   animate-fade-in-up sm:flex">Welcome to
        <h2 className="text-green-700 bold ml-2 font-semibold font-serif "> "Smart</h2> <h2 className="ml-2 font-semibold font-serif">Parking"</h2></div>
        <p className="text-green-900 text-lg mb-4 animate-fade-in-up-delay sm:text-md">
          Reserve your parking spot and have a hassle-free experience.
        </p>

        <Link to="/nearest-parking">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-5 mt-5 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-tl from-blue-500 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-600 hover:text-white  dark:text-white dark:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-800 dark:focus:ring-blue-300 transform hover:scale-105 transition-transform">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-blue-500 rounded-md group-hover:bg-opacity-0">
              Nearest Parking
            </span>
          </button>
        </Link>

        <Link to="/spots">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transform hover:scale-105 transition-transform">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reserve Parking
            </span>
          </button>
        </Link>
      </div>
      {/* <h2 className="text-green-700  text-3xl bold ml-2 font-semibold font-serif text-center mb-5">Nearest Parking Spots</h2>
      <div className="flex flex-wrap gap-4 mt-2 p-2">
        {console.log(spots)}
      {spots ? spots.map((s) => s && <ParkingSpotCard key={s._id} spot={s} />) : <p>No spots available.</p>}
        
      </div> */}
    </div>
  );
};

export default Home;
