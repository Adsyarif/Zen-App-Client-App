import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Dayjs } from "dayjs";
import DatePicker from "./common/DatePicker";

const DropdownCalendar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="visible md:hidden lg:hidden">
      <IconButton onClick={handleMenuOpen}>
        <CalendarMonthOutlinedIcon className="w-10 h-10 text-green-900"></CalendarMonthOutlinedIcon>
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <DatePicker
          type="date"
          label="Select Date"
          onChange={handleDateChange}
        />
      </Menu>
    </div>
  );
};

export default DropdownCalendar;
