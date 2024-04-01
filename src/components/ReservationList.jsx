/* eslint-disable react/prop-types */
import moment from "moment";
import DeleteReservationModal from "./modals/DeleteReservationModal";
import { FaCarSide } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";

function ReservationsList({ reservations }) {
  const IconMap = {
    car: <FaCarSide className="h-4 w-4" />,
    bike: <RiMotorbikeFill className="h-4 w-4" />,
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
      <table className="min-w-full divide-y divide-gray-200 border-separate">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Total Cost
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td className="px-6 py-4 flex items-center gap-4 whitespace-no-wrap capitalize">
                {IconMap[reservation?.vehicle?.vehicleType] ?? IconMap["bike"]}
                {reservation?.vehicle?.model ?? "Yamaha"}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {moment(reservation.startTime).format("D MMMM , h:mm A")}
              </td>
              <td className="px-6 whitespace-no-wrap">{moment(reservation.endTime).format("D MMMM , h:mm A")}</td>
              <td className="px-6 whitespace-no-wrap">{reservation.status}</td>
              <td className="px-6 whitespace-no-wrap">${reservation.totalCost.toFixed(2)}</td>
              <td className="px-6 whitespace-no-wrap">
                <DeleteReservationModal id={reservation._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationsList;
