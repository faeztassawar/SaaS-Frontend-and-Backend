import React from "react";

const UserForm = () => {
  return (
    <div>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="First and last name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Street Address
          </label>
          <input
            type="text"
            id="street"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Street address"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-full">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
              placeholder="City"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-[#800000] text-white font-semibold rounded-lg mb-2"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default UserForm;
