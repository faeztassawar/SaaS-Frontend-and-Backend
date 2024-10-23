const AddUserPage = () => {
  return (
    <div className="bg-[#172340] p-5 rounded-lg mt-5 text-white">
      <form className="flex flex-wrap justify-between">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-600 rounded-md mb-5 w-[45%]"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-600 rounded-md mb-5 w-[45%]"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="p-4 bg-[#1f273a] text-white border-2 border-gray-600 rounded-md mb-5 w-[45%]"
        />

        <select
          name="isAdmin"
          className="p-4 pr-10 text-white bg-[#1f273a] border-2 border-gray-600 rounded-md mb-5 w-[45%]"
        >
          <option value="">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button
          type="submit"
          className="w-full p-4 bg-[#1c9cea] text-white rounded-md cursor-pointer"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
