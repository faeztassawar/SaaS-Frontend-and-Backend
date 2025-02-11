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

  if (!imageUrl)
    console.log("No Image Found")
  return (
    <div
      className="p-3 rounded-lg text-center flex flex-col items-center max-w-[15rem] mx-auto hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="w-[150px] h-[150px] flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl as string} // Use the dynamic image source if provided
          alt={name}
          width={150}
          height={150}
          className="object-cover"
        />
      </div>

      {/* Product Name */}
      <h4 className="font-semibold text-xl my-3">{name}</h4>

      {/* Product Description */}
      <p className="text-gray-500 text-sm text-center px-4">{desc}</p>

      {/* Add to Cart Button */}
      <button
        className="mt-4 bg-[#800000] text-white rounded-full px-8 py-2"
        aria-label={`Add ${name} to cart for ${price}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent `onClick`
          if (onAddToCart) {
            onAddToCart(name); // Pass the item's name to the `onAddToCart` callback
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;