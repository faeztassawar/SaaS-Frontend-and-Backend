import { FaCircleUser } from "react-icons/fa6";

type DReservationProp = {
  name: string;
  time: string;
  date: string;
  count: number | string;
  status: string;
  index: number;
};

const DReservation = ({
  name,
  time,
  date,
  count,
  status,
  index,
}: DReservationProp) => {
  const handleReject = (i: number) => {};

  return (
    <div className="flex gap-2">
      <div className="flex justify-between w-[80%]">
        <div className="py-4 px-4">
          <div className="flex items-center gap-2">
            <FaCircleUser />
            {name}
          </div>
        </div>
        <h1 className="py-4 px-4">{date}</h1>
        <h1 className="py-4 px-4">{time}</h1>
        <h1 className="py-4 px-4">{count}</h1>
      </div>
      <div className="flex justify-center w-[20%]">
        {status == "p" ? (
          <div className="flex items-center justify-center gap-3 w-full">
            <button className="px-5 py-2 bg-blue-600 font-semibold rounded-lg my-2 items-center text-white hover:scale-105 transition-transform">
              Accept
            </button>
            <button
              onClick={() => {
                handleReject(index);
              }}
              className="px-5 py-2 bg-red-600 rounded-lg items-center font-semibold text-white hover:scale-105 transition-transform"
            >
              Reject
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DReservation;
