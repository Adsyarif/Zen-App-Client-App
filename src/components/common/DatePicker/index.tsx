import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";

// type datetime untuk counseler page 
// type date untuk diary page
type DATE_PICKER_TYPE = "date" | "datetime";

interface DatePickerProps {
  type: DATE_PICKER_TYPE;
  label: string;
  onChange: (date: Dayjs | null) => void;
}

const DatePicker = ({ label, type, onChange }: DatePickerProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleChange = (newDate: Dayjs | null) => {
    setDate(newDate);
    onChange(newDate);
    console.log(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {type === "date" && (
        <StaticDatePicker 
        value={date} 
        onChange={handleChange} 
        slotProps={{
          actionBar: {
            actions: ['today'],
            sx: {
              display: 'flex',
              justifyContent: 'center',
            },
          },
        }}    
      />)}
      {type === "datetime" && (
           <DateTimePicker
           label={label}
           value={date}
           onChange={handleChange}
           slotProps={{
            actionBar: {
              actions: ['today'],
              sx: {
                display: 'flex',
                justifyContent: 'center',
              },
            },
          }}
         />
      )}
    </LocalizationProvider>
  );
};

export default DatePicker;