"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const simulatedFetch = () => {
      return [
        { _id: "1", name: "John Doe", email: "john@example.com" },
        { _id: "2", name: "Jane Smith", email: "jane@example.com" },
        { _id: "3", name: "Sam Wilson", email: "sam@example.com" },
      ];
    };

    const fetchedUsers = simulatedFetch();
    setUsers(fetchedUsers);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAdmin={true} />
      <div className="text-center mt-8 mb-12">
        <UserTabs isAdmin={true} />
      </div>
      <div className="items-center justify-center mt-6 w-full max-w-2xl mx-auto">
        <div className="shadow-2xl rounded-lg p-5 bg-gray-100">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-300 rounded-lg mb-3 p-4 flex items-center justify-between  hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
              >
                <div className="flex flex-col flex-grow text-left">
                  <span className="text-gray-900 font-semibold">
                    {user.name || <span className="italic">No name</span>}
                  </span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div>
                  <button className="button bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No users found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
