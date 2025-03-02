import { useState } from "react";
import Image from "next/image";


interface MenuItemType {
  name: string;
  desc: string;
  price: string;
  image: Uint8Array | { type: "Buffer"; data: number[] } | string;
}

interface ItemModalProps {
  item: MenuItemType;
  onClose: () => void;
  onAddToCart: (itemName: string) => void;
}

const ItemModal = ({ item, onClose, onAddToCart }: ItemModalProps) => {
  const [selectedSize, setSelectedSize] = useState("Medium");
  console.log("Image: ", item.image);

  const getImageUrl = () => {
    // If img is an object with numeric keys (incorrectly structured Uint8Array)
    if (typeof item.image === "object" && item.image !== null) {
      // If img is an object with numeric keys (incorrectly structured Uint8Array)
      if (!("type" in item.image)) {
        const byteArray = Object.values(item.image); // Extract numeric values
        const buffer = Buffer.from(byteArray); // Convert to Buffer

        return `data:image/jpeg;base64,${buffer.toString("base64")}`;
      }

      // If img is a serialized Buffer object (e.g., from an API response)
      if (item.image.type === "Buffer") {
        return `data:image/jpeg;base64,${Buffer.from(item.image.data).toString(
          "base64"
        )}`;
      }
    }

    // If img is a Uint8Array (direct Prisma format)
    if (item.image instanceof Uint8Array) {
      return `data:image/jpeg;base64,${Buffer.from(item.image).toString("base64")}`;
    }

    // If img is already a Base64 string or URL
    if (typeof item.image === "string") return item.image;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-2xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-transform scale-105 hover:scale-125"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image */}
        <div className="w-full flex justify-center">
          <Image
            src={imageUrl as string}
            alt={item.name}
            width={180}
            height={180}
            className="rounded-lg shadow-md object-cover"
            unoptimized
          />
        </div>

        {/* Item Name */}
        <h3 className="text-2xl font-semibold text-center mt-4">{item.name}</h3>
        <p className="text-gray-600 text-center mt-2">{item.desc}</p>
        <p className="text-lg font-bold text-center text-[#800000] mt-2">${item.price}</p>

        {/* Size Selection */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 text-center mb-2">Select Size</h4>
          <div className="flex justify-center gap-6">
            {["Small", "Medium", "Large"].map((size) => (
              <label
                key={size}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold transition-all 
                  ${
                    selectedSize === size
                      ? "bg-[#800000] text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="size"
                  value={size}
                  className="hidden"
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="block mx-auto mt-6 bg-[#800000] text-white rounded-full px-6 py-2 font-semibold 
          transition-all hover:scale-105 shadow-md hover:bg-[#990000]"
          onClick={() => {
            onAddToCart(item.name);
            onClose();
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ItemModal;