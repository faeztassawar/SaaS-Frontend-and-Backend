import React from "react";
import Image from "next/image";

type MenuItemProp = {
  name: string;
  desc: string;
  price: number | string;
  img: Uint8Array | { type: "Buffer"; data: number[] } | string;
  onClick?: () => void;
  onAddToCart?: (itemName: string) => void;
};

const MenuItem = ({
  name,
  desc,
  price,
  img,
  onClick,
  onAddToCart,
}: MenuItemProp) => {
  console.log("Image: ", img);
  const getImageUrl = () => {
    // If img is an object with numeric keys (incorrectly structured Uint8Array)
    if (typeof img === "object" && img !== null) {
      // If img is an object with numeric keys (incorrectly structured Uint8Array)
      if (!("type" in img)) {
        const byteArray = Object.values(img); // Extract numeric values
        const buffer = Buffer.from(byteArray); // Convert to Buffer

        return `data:image/jpeg;base64,${buffer.toString("base64")}`;
      }

      // If img is a serialized Buffer object (e.g., from an API response)
      if (img.type === "Buffer") {
        return `data:image/jpeg;base64,${Buffer.from(img.data).toString(
          "base64"
        )}`;
      }
    }

    // If img is a Uint8Array (direct Prisma format)
    if (img instanceof Uint8Array) {
      return `data:image/jpeg;base64,${Buffer.from(img).toString("base64")}`;
    }

    // If img is already a Base64 string or URL
    if (typeof img === "string") return img;
  };

  const imageUrl = getImageUrl();

  if (!imageUrl) console.log("No Image Found");
  return (
    <div
      className="p-4 rounded-lg text-center flex flex-col items-center max-w-[16rem] mx-auto bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-gray-200"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="w-[160px] h-[160px] flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={imageUrl as string}
          alt={name}
          width={160}
          height={160}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Name */}
      <h4 className="font-bold text-xl mt-4 text-gray-900">{name}</h4>

      {/* Product Description */}
      <p className="text-gray-600 text-sm text-center px-4 mt-2">{desc}</p>

      {/* Product Price */}
      <p className="text-xl font-semibold text-[#d32f2f] mt-3">${price}</p>

      {/* Add to Cart Button */}
      <button
        className="mt-4 bg-[#800000] text-white font-medium rounded-full px-6 py-2 hover:bg-red-700 transition-all duration-200"
        aria-label={`Add ${name} to cart for ${price}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onAddToCart) {
            onAddToCart(name);
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;
