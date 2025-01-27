const AddProductPage = () => {
  return (
    <div className="p-5 rounded-lg bg-[#172340] mt-5">
      <form className="flex flex-wrap justify-between">
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />
        <select
          name="cat"
          id="cat"
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        >
          <option value="general">Choose a Category</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          name="price"
          required
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          required
          min="1"
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-[45%]"
        />

        <textarea
          required
          name="desc"
          id="desc"
          rows={6}
          placeholder="Description"
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-700 rounded-md mb-5 w-full"
        ></textarea>
        <button
          type="submit"
          className="w-full p-4 bg-[#1c9cea] text-white rounded-md cursor-pointer"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
