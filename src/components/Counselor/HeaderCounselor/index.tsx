import DatePicker from "@/components/common/DatePicker";
import { useState } from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";

interface Props {
  handleOnChange: any;
}

const HeaderCounselor = ({ handleOnChange, onDateChange }: Props) => {
  const [calendar, setCalendar] = useState(false);
  const handleClick = () => {
    setCalendar(!calendar);
  };

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
        <div className="relative">
          {!calendar && (
            <FaCalendarAlt
              size={24}
              onClick={handleClick}
              className="text-leaf md:text-2xl cursor-pointer"
            />
          )}
          {calendar && (
            <DatePicker
              label="Select Date"
              type="datetime"
              onChange={onDateChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderCounselor;
