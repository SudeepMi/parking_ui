import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../api";
import Loading from "../components/Loading";
import { FaCar, FaCreativeCommonsSampling, FaDollarSign } from "react-icons/fa";
import ReservationsList from "../components/ReservationList";


const Profile = () => {
  const fetchProfile = async () => {
    try {
      const res = await privateAxios.get("/auth/me");
      return res.data.user;
    } catch (error) {
      console.log("Error while fetching profile", error);
      throw error; // Re-throw the error so React Query handles it
    }
  };

  const { data: user, isLoading, isError, error } = useQuery(["profile"], fetchProfile);

  let totalExpenses = 0;

  if (user && user.reservations) {
    const reservations = user.reservations;

    for (const reservation of reservations) {
      totalExpenses += reservation.totalCost;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-11/12 mx-auto my-10 space-y-6">
      <h2 className="text-2xl">{user.name}</h2>
      {user.vehicles.length < 1 && user.reservations.length < 1 && <p className="text-rose-500">Nothing to render!!</p>}
      {user.vehicles.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-10">
          <div
            className={`flex items-center gap-4 border border-purple-600 py-4 px-4 rounded-md cursor-pointer hover:border-purple-400 transition-all ease-out`}
          >
            <FaCar className="w-10 h-10" />
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">Vehicles Registered</div>
              <div className="text-xl text-neutral-800">{user.vehicles.length}</div>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 border border-purple-600 py-4 px-4 rounded-md cursor-pointer hover:border-purple-400 transition-all ease-out`}
          >
            <FaCreativeCommonsSampling className="w-10 h-10" />
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">Total Reservations</div>
              <div className="text-xl text-neutral-800">{user.reservations.length}</div>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 border border-purple-600 py-4 px-4 rounded-md cursor-pointer hover:border-purple-400 transition-all ease-out`}
          >
            <FaDollarSign className="w-10 h-10" />
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">Total Expenses</div>
              <div className="text-xl text-green-600">{totalExpenses.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Table showing reservations */}
      {user.reservations.length > 0 ? (
        <ReservationsList reservations={user.reservations} />
      ) : (
        <p className="text-rose-500">No reservations yet</p>
      )}
    </div>
  );
};

export default Profile;
