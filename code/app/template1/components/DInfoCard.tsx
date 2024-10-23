import { MdSupervisedUserCircle } from "react-icons/md";

type DInfoProp = {
  title: string;
  stats: string;
  percent: number | string;
};

const Card = ({ title, stats }: DInfoProp) => {
  return (
    <div className="bg-[#172340] p-5 rounded-lg flex gap-3 cursor-pointer w-full hover:bg-[#1b294b] hover:text-white">
      <MdSupervisedUserCircle size={30} />
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-2xl font-medium">{stats}</span>
        <span className="text-sm font-light"></span>
      </div>
    </div>
  );
};

export default Card;
