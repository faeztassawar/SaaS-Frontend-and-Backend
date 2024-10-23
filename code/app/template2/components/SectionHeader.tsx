import React from "react";

type SectionHeaderProp = {
    subHeader: string;
    mainHeader: string;
  };
  
  const SectionHeader = ({ subHeader, mainHeader }: SectionHeaderProp) => {
  return (
    <div>
      <h3 className="text-[#800000] font-semibold leading-4 mb-2">{subHeader}</h3>
      <h2 className="text-[#800000] font-bold italic text-4xl">{mainHeader}</h2>
    </div>
  );
};

export default SectionHeader;
