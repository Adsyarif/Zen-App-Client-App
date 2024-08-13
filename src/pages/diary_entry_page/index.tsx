import DiaryEntryContainer from "@/components/diary_entry_container";
import MoodPickerComponent from "@/components/mood_picker";
import DatePicker from "@/components/common/DatePicker";
import { Dayjs } from "dayjs";
import { useState } from "react";

const DiaryEntryPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="md:flex md:flex-row justify-between gap-5 p-8 lg:mx-32 lg:mb-24 items-center">
      <DiaryEntryContainer />
      <div className="flex flex-col gap-10">
        <div className="hidden md:block">
          <DatePicker
            type="date"
            label="Select Date"
            onChange={handleDateChange}
          />
        </div>
        <MoodPickerComponent />
      </div>
    </div>
  );
};

export default DiaryEntryPage;
