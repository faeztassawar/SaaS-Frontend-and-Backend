"use client";

import { MdSearch } from "react-icons/md";

type SearchProps = {
  placeholder: string;
};

const Search = ({ placeholder }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg max-w-fit">
      <MdSearch className="text-white" />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none text-white outline-none"
      />
    </div>
  );
};

export default Search;
