/* eslint-disable react/prop-types */
import { FaCar, FaMotorcycle } from "react-icons/fa";

const Card = ({ total, vehicleType }) => {
  const iconMap = {
    car: <FaCar className="h-10 w-10" />,
    bike: <FaMotorcycle className="h-10 w-10" />,
  };
  return (
    <div
      className={`flex items-center justify-between border border-purple-600 py-4 px-4 rounded-md cursor-pointer hover:border-purple-400 transition-all ease-out`}
    >
      {iconMap[vehicleType]}
      {/* <div className="text-2xl font-semibold">{label}</div> */}
      <div className="text-xl text-black">{total}</div>
    </div>
  );
};

export default Card;
