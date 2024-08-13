import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

interface DatePickerProps {
  label: string;
  onChange: (date: Dayjs | null) => void;
}

const DatePicker = ({ label, onChange }: DatePickerProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleChange = (newDate: Dayjs | null) => {
    setDate(newDate);
    onChange(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={date}
        onChange={handleChange}
        
      />
    </LocalizationProvider>
  );
};

export default DatePicker;