import Link from "next/link";
import React from "react";

interface Order {
  id: string;
  email: string;

  items?: string[];
}

interface OrderRequestProps {
  order: Order;
  onUpdateStatus: (id: string, status: string) => void;
}

const OrderRequest: React.FC<OrderRequestProps> = ({ order, onUpdateStatus }) => {
  return (
    <div className="flex bg-gray-50 mb-2 p-4 rounded-lg items-center gap-10">
      <div className="grow flex items-center gap-6">
        <div className="grow">
          <div className="flex gap-2 items-center mb-1">
            <div className="grow">{order.email}</div>
          </div>
          <div className="text-gray-500 text-xs">
            {order.items?.join(", ")}
          </div>
        </div>
      </div>
      <div className="justify-end flex gap-2 items-center whitespace-nowrap">
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
        <button
          onClick={() => onUpdateStatus(order.id, "IN PROGRESS")}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-300"
        >
          In Progress
        </button>
      </div>
    </div>
  );
};

export default OrderRequest;
