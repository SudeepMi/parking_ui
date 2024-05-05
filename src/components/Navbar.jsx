import { Link } from "react-router-dom";

import { TokensContext } from "../hooks/useTokens";
import { useContext } from "react";



const Navbar = () => {
  const { accessToken, deleteTokens } = useContext(TokensContext);
  const isLoggedIn = accessToken ? true : false;

  return (
    <header className="fixed top-0 w-full backdrop-blur-sm  border-b h-16 bg-gray-200 shadow-md z-50">
      <nav className="w-11/12 mx-auto h-full flex items-center z-50">
        <div className="w-full flex items-center justify-between">
          <div className="hover:underline text-lg font-semibold">
            <Link to="/"><img  className="w-full h-10 object-cover object-center mb-1"  src="smartLogo.png" alt="logo" /></Link>
          </div>

          <ul className="flex items-center gap-4 text-black font-semibold ">
            <Link to="/">
              <li className="hover:text-green-700 transition">Home</li>
            </Link>
            <Link to="/spots">
              <li className="hover:text-green-700 transition">Parking Places</li>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/vehicles">
                  <li className="hover:text-green-700 transition">Vehicles</li>
                </Link>
                <Link to="/parkings">
                  <li className="hover:text-green-700 transition">Parking Status</li>
                </Link>
                <Link to="/profile">
                  <li className="hover:text-green-700 transition">Profile</li>
                </Link>
                <button onClick={() => deleteTokens()} className="bg-purple-500 hover:bg-purple-700 px-4 py-1 text-white rounded-md">
                  Sign out
                </button>
                
            
              </>
            ) : (
              <Link to="/signin">
                <li className=" text-white transition px-4 py-1 bg-purple-500 hover:bg-purple-700 rounded-md">Sign in</li>
              </Link>
             
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
