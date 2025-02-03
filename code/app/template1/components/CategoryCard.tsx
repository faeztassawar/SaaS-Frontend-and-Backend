import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

type CategoriesCardProp = {
  name: string;
  // desc: string;
  img: Uint8Array | { type: "Buffer"; data: number[] } | string;
};

const Categories = ({ name, img }: CategoriesCardProp) => {
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
  return (
    <div className="group hover:cursor-pointer flex relative h-screen w-full md:w-[33vw] overflow-hidden bg-neutral-200">
      <Image
        src={imageUrl as string} // Ensure it's always a string
        fill
        alt={name}
        className="absolute inset-0 z-0 brightness-[30%] transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 gap-7 z-10 flex px-5 text-center flex-col items-center place-content-center">
        <h1 className="text-7xl md:text-4xl xl:text-7xl font-rose text-[#face8d]">
          {name}
        </h1>
        {/* <h1 className="text-6xl md:text-4xl xl:text-6xl font-[900] text-white flex-wrap">
          {desc}
        </h1> */}
      </div>
    </div>
  );
};

export default Categories;
