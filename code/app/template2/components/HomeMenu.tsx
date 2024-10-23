import React from "react";
import Image from "next/image";
import Salad1Img from "@/app/template2/images/salad1.png";
import Salad2Img from "@/app/template2/images/salad2.png";
import MenuItem from "./MenuItem";
import SectionHeader from "./SectionHeader";

const HomeMenu = () => {
  return (
    <div>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={Salad1Img} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={Salad2Img} width={107} height={195} alt={"sallad"} />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeader subHeader="CHECKOUT" mainHeader="Menu"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 mt-10 w-[40rem] mx-auto">
        <MenuItem
          name="Malai Boti Pizza"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          price="$12"
        />
        <MenuItem
          name="Malai Boti Pizza"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          price="$12"
        />
        <MenuItem
          name="Malai Boti Pizza"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          price="$12"
        />
        <MenuItem
          name="Malai Boti Pizza"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          price="$12"
        />
        <MenuItem
          name="Malai Boti Pizza"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          price="$12"
        />
        <MenuItem
          name="Malai Boti Pizza"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          price="$12"
        />
      </div>
    </div>
  );
};

export default HomeMenu;
