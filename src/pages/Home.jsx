import { useContext } from "react";
import { FaCashRegister } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TokensContext } from "../hooks/useTokens";

const Home = () => {
  const { accessToken } = useContext(TokensContext);
  return (
    <div>
      {!accessToken && (
        <div className="w-full flex items-center gap-4 bg-yellow-600 py-2 px-4 sm:px-14">
          <FaCashRegister className="h-6 w-6" />
          <p>Opps Youre not logged in</p>
        </div>
      )}
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <div className="text-black text-4xl mb-6 animate-fade-in-up">Welcome to Parking Reservation</div>
        <p className="text-black text-lg mb-4 animate-fade-in-up-delay">
          Reserve your parking spot and have a hassle-free experience.
        </p>

        <Link to="/spots">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transform hover:scale-105 transition-transform">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reserve Parking
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
