import DSearch from "@/app/template1/components/DSearch";
import noavatar from "@/app/template1/images/noavatar.png";
import Image from "next/image";
import Link from "next/link";

const UsersPage = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <DSearch placeholder="Search for a user...." />
        <Link href="/template1/adminDashboard/users/add">
          <button className="px-4 py-2 bg-[#1c9cea] text-white rounded-lg hover:bg-blue-700 transition">
            Add new
          </button>
        </Link>
      </div>
      <table className="w-full bg-[#172340] rounded-xl border-gray-700 shadow-md">
        <thead className="">
          <tr>
            <td className="py-3 px-4 border-b border-gray-600">Name</td>
            <td className="py-3 px-4 border-b border-gray-600">Email</td>

            <td className="py-3 px-4 border-b border-gray-600">Role</td>
            <td className="py-3 px-4 border-b border-gray-600">Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 px-4 border-gray-600">
              <div className="flex items-center gap-2 ">John Doe</div>
            </td>

            <td className="py-3 px-4 ">john@gmail.com</td>
            <td className="py-3 px-4 ">Admin</td>
            <td className="py-3 px-4 ">
              <div className="flex gap-2">
                <Link href="/dashboardd/users/id">
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
                    View
                  </button>
                </Link>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
