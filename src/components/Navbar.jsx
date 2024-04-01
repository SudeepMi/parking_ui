import { Link } from "react-router-dom";

import { TokensContext } from "../hooks/useTokens";
import { useContext } from "react";

const Navbar = () => {
  const { accessToken, deleteTokens } = useContext(TokensContext);
  const isLoggedIn = accessToken ? true : false;

  return (
    <header className="fixed top-0 w-full backdrop-blur-sm  border-b border-gray-600 h-16 bg-gray-200">
      <nav className="w-11/12 mx-auto h-full flex items-center ">
        <div className="w-full flex items-center justify-between">
          <div className="hover:underline text-lg font-semibold">
            <Link to="/"><img  className="w-full h-10 object-cover object-center mb-1"  src="smartLogo.png" alt="logo" /></Link>
          </div>
          <ul className="flex items-center gap-4">
            <Link to="/">
              <li className="hover:underline transition">Home</li>
            </Link>
            <Link to="/spots">
              <li className="hover:underline transition">Parking Places</li>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/vehicles">
                  <li className="hover:underline transition">Vehicles</li>
                </Link>
                <Link to="/parkings">
                  <li className="hover:underline transition">Parkings</li>
                </Link>
                <Link to="/profile">
                  <li className="hover:underline transition">Profile</li>
                </Link>
                <button onClick={() => deleteTokens()} className="bg-white px-4 py-1 hover:bg-zinc-800 rounded-md">
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/signin">
                <li className="hover:bg-zinc-700 transition px-4 py-1 bg-zinc-600 rounded-md">Sign in</li>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
