import Link from "next/link";
import React, { useEffect } from "react";

interface Order {
  id: string;
  email: string;

  items?: string[];
}

interface OrderRequestProps {
  order: Order;
  onUpdateStatus: (id: string, status: string) => void;
  status: string;
  price: string;
  phone: string;
  address: string;
}

const OrderRequest: React.FC<OrderRequestProps> = ({
  order,
  onUpdateStatus,
  status,
  price,
  phone,
  address,
}) => {
  return (
    <div className="flex bg-gray-50 mb-2 p-4 rounded-lg items-center gap-10">
      <div className="grow flex items-center gap-6">
        <div className="grow">
          <div className="flex gap-2 items-center mb-1">
            <div className="grow">{order.email}</div>
          </div>
          <div className="text-gray-500 text-xs">{order.items?.join(", ")}</div>
          <div className="text-gray-500 text-xs">Price: {price}</div>
          <div className="text-gray-500 text-xs">Phone: {phone}</div>
          <div className="text-gray-500 text-xs">Address: {address}</div>
        </div>
      </div>
      <div className="justify-end flex gap-2 items-center whitespace-nowrap">
        {status === "pending" ? (
          <>
            <button
              onClick={() => onUpdateStatus(order.id, "ACCEPTED")}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Confirm
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, "CANCELLED")}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OrderRequest;
