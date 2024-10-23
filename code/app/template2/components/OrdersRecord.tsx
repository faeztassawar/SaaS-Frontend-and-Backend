import Link from "next/link";
import React from "react";

type AllOrdersProp = {
  value: string;
};

const OrdersComponent = ({ value }: AllOrdersProp) => {
  return (
    <div className="flex bg-gray-50 mb-2 p-4 rounded-lg items-center gap-10">
      <div className="grow flex items-center gap-6">
        <div>
          <div
            className={`p-2 rounded-md text-white w-24 text-center font-semibold ${
              value === "Paid" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {value}
          </div>
        </div>
        <div className="grow">
          <div className="flex gap-2 items-center mb-1">
            <div className="grow">tassawarfaez@gmail.com</div>
            <div className="text-gray-500 text-sm">29/09/2024 10:45:06 PM</div>
          </div>

          <div className="text-gray-500 text-xs">
            Special Pizza, Crown Crust Pizza, Malai Boti Pizza
          </div>
        </div>
      </div>

      <div className="justify-end flex gap-2 items-center whitespace-nowrap">
        <Link
          href="Orders/1"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Show Order
        </Link>
      </div>
    </div>
  );
};

export default OrdersComponent;
