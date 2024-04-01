import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl text-blue-500">
        <FaSpinner className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
