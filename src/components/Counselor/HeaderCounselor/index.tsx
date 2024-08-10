import { FaCalendarAlt, FaSearch } from "react-icons/fa";

interface Props {
  handleOnChange: any;
}

const HeaderCounselor = ({ handleOnChange }: Props) => {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center w-64 h-12 px-4 bg-leaf border rounded-lg">
        <FaSearch className="text-white h-6 w-6 mr-2" />
        <input
          className="w-full text-center text-white bg-leaf p-2 placeholder-white text-lg placeholder:text-lg border-none rounded-lg"
          type="text"
          name="search"
          placeholder="Search"
          onChange={handleOnChange}
        />
      </div>
      <div>
        <FaCalendarAlt size={24} className="text-leaf md:text-2xl" />
      </div>
    </div>
  );
};

export default HeaderCounselor;
