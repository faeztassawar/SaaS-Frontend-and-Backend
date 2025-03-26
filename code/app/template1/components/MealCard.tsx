import React from "react";
import Image from "next/image";

type MealCardProps = {
  name: string; // Changed "String" to "string" for consistency with TypeScript conventions
  desc: string;
  price: number | string;
  img: Uint8Array | { type: "Buffer"; data: number[] } | string;
};

const MealCard = ({ name, desc, price, img }: MealCardProps) => {
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

  return (
    <div className="flex flex-col items-start py-4 px-8 w-full">
      <div className="flex w-full items-center gap-4 font-chillax">
        {/* Image Section */}
        <div className="relative w-24 h-24">
          <Image
            className="rounded-lg object-cover"
            src={imageUrl as string}
            fill
            alt={`${name} image`} // Dynamically set alt text for better accessibility
          />
        </div>

        {/* Name and Description Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          <p className="text-gray-400 text-sm mt-2">{desc}</p>
        </div>

        {/* Price Section */}
        <div className="text-right">
          <span className="text-xl font-semibold text-white">{`$${price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
