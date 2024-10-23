import { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
type Prop = {
  name: string;
  price: number;
};

interface MenuItemPricePropsType {
  name: string;
  addLabel: string;
  props: Prop[];
  setProps: React.Dispatch<React.SetStateAction<Prop[]>>;
}

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}: MenuItemPricePropsType) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number,
    prop: keyof Prop
  ) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = {
        ...newSizes[index],
        [prop]: prop === "price" ? parseFloat(newValue) : newValue,
      };
      return newSizes;
    });
  }

  function removeProp(indexToRemove: number) {
    setProps((prev) => prev.filter((_, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-4 shadow-md">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center p-2 text-left w-full border-0 justify-start"
        type="button"
      >
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        <span className="ml-2 font-medium">{name}</span>
      </button>

      {isOpen && (
        <div className="mt-2">
          {props?.length > 0 ? (
            props.map((size, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={size.name}
                    onChange={(ev) => editProp(ev, index, "name")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extra Price
                  </label>
                  <input
                    type="text"
                    placeholder="Extra price"
                    value={size.price}
                    onChange={(ev) => editProp(ev, index, "price")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <button
                    type="button"
                    onClick={() => removeProp(index)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaRegTrashCan size={22} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
          <button
            type="button"
            onClick={addProp}
            className="flex items-center bg-white text-blue-500 hover:bg-gray-100 p-2 rounded-lg mt-2 transition"
          >
            <IoMdAdd className="w-4 h-4 mr-1" />
            <span>{addLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
