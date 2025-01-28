import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

type CategoriesCardProp = {
  name: string;
  // desc: string;
  img: string | StaticImport;
};

const Categories = ({ name, img }: CategoriesCardProp) => {
  return (
    <div className="group hover:cursor-pointer flex relative h-screen w-full md:w-[33vw] overflow-hidden bg-neutral-200">
      <Image
        src={img}
        fill
        alt=""
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
